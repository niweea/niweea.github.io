---
title: "【转译】从零开始：用 Python 构建一个 AI Agent"
date: 2025-10-04T18:12:22+08:00
tags: ["AI Agent", "大模型", "Python", "LLM", "人工智能"]
categories: ["AI Agent"]
description: "深入剖析大模型智能体底层机制，不依赖第三方框架，使用 Python 和大模型 API 从零实现单智能体系统（Agent Loop、Memory、Tools）。"
---

此文翻译自Leonie Monigatti的 [Building an AI agent from scratch in Python](https://www.leoniemonigatti.com/blog/ai-agent-from-scratch-in-python.html)

如何通过大模型 API 实现一个不依赖框架的单智能体系统(a single AI agent)。

市面上构建 AI 智能体的框架层出不穷，如 CrewAI、LangGraph 和 OpenAI Agents SDK，面对这些选择，开发者往往会感到无从下手。Anthropic 曾建议：在依赖复杂的框架抽象之前，最好先直接调用大模型(LLM)接口来理解其底层基本功。

本教程遵循这一思路，我们将直接使用大模型 API，在 Python 中从零开始实现一个 AI 智能体。通过这种方式，你可以深入理解智能体运行的内部机制。我们将首先聚焦于单智能体的实现，这是迈向更复杂的“智能体工作流”(agentic workflows)或“多智能体系统”(multi-agent)的基石。

## 手写 AI 智能体的核心组件

我们将一步步实现一个 `Agent()` 类，它包含智能体的四大核心组件：

1. `大模型与指令 (LLM & Instructions)`：智能体的“大脑”，负责推理、决策，并遵循特定的行为准则。

2. `记忆 (Memory)`：对话历史（短期记忆 short-term memory），让智能体理解当前的语境。

3. `工具 (Tools)`：智能体可以调用的外部函数或 API。

循环 (Agent Loop)：将上述组件有机结合的闭环逻辑。

## 组件 1：大模型与指令(LLM and Instructions)

智能体的核心是具备“工具调用”能力的大模型（如 Anthropic’s Claude 4 Sonnet、OpenAI’s GPT-4o 或 Google’s Gemini 2.5 Pro）.

本教程以 Anthropic 的 API 为例，但其逻辑可以轻松迁移到其他模型。

在使用 Anthropic API 之前，你需要先准备好 `ANTHROPIC_API_KEY`。只需注册 Anthropic 账号，并在控制面板（Dashboard）的 “API Keys” 栏目中生成即可。获取密钥后，请根据你的开发环境，将其妥善配置在环境变量、.env 配置文件或 Google Colab 的 Secrets（安全密钥）中。

首先，安装并导入必要的库：

```shell
%%capture
%pip install -U anthropic python-dotenv
```

```python3
import anthropic
import os
from dotenv import load_dotenv
from google.colab import userdata

load_dotenv()

print(anthropic.__version__)
# 0.69.0
```

现在，我们实现一个简单的 Agent 类，包含以下部分：

* 初始化（Initialization）：设置 LLM 客户端，并为模型配置一个系统提示词（system prompt），该提示词包含了关于 Agent 应当如何行动的指令。（你也可以将其设为一个可以传递给 Agent 的参数，但为了简单起见，我们将使用一个固定的提示词。）

* chat 方法：通过将用户消息发送给 LLM API 并返回响应来处理这些消息。

```python3
class Agent:
    """一个简单的、能够回答问题的 AI 智能体"""
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.model = "claude-sonnet-4-20250514"
        self.system_message = "You are a helpful assistant that breaks down problems into steps and solves them systematically."

    def chat(self, message):
        """Process a user message and return a response"""

        response = self.client.messages.create(
            model=self.model,
            max_tokens=1024,
            system=self.system_message,
            messages=[
                {"role": "user", "content": message}
                ],
            temperature=0.1,
        )

        return response

```

此时的智能体只能进行单次问答。测试一下：

```python3
agent = Agent()

response = agent.chat("I have 4 apples. How many do you have?")
print(response.content[0].text)
```

```text
don't have any apples - as an AI, I don't have a physical form, so I can't possess physical objects like apples. Only you have apples in # this scenario (4 of them). 
Is there something you'd like to do with this information, like a math problem involving your apples?
```

接着问第二个问题：

```python3
response = agent.chat("I ate 1 apple. How many are left?")
print(response.content[0].text)
```

```text
I don't have enough information to answer how many apples are left. To solve this, I would need to know:

**What I need:**
- How many apples you started with

**The calculation would be:**
Starting number of apples - 1 apple eaten = Apples remaining

Could you tell me how many apples you had before eating one?
```

如你所见，Agent 缺失了第一条消息的信息。这就是为什么我们需要给 Agent 提供对话历史。


## 组件 2：记忆 (对话上下文)

智能体的记忆（Memory）可以有多种不同的形式，例如短时记忆和长时记忆，而且记忆管理本身就是一个复杂的话题。为了本教程起见，让我们保持简单，从一个基础的短时记忆实现开始。

短时记忆让智能体能够访问对话历史，从而理解当前的交互。在最简单的形式下，短时记忆仅仅是用户（user）和助手（assistant）之间过去消息的列表。（请注意，随着对话历史变得越来越长，你将会遇到**上下文窗口（context window）**的限制，并需要实现更复杂的解决方案。）

我们通过添加一个 messages 属性来实现短时记忆，在该属性中我们同时存储以下两部分内容：

用户输入：使用 `{"role": "user", "content": message}`

响应结果：使用 `{"role": "assistant", "content": response.content}`

```python3
class Agent:
    """A simple AI agent that can answer questions in a multi-turn conversation"""

    def __init__(self):
        self.client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.model = "claude-sonnet-4-20250514"
        self.system_message = "You are a helpful assistant that breaks down problems into steps and solves them systematically."
        self.messages = []

    def chat(self, message):
        """Process a user message and return a response"""

        # Store user input in short-term memory
        self.messages.append({"role": "user", "content": message})

        response = self.client.messages.create(
            model=self.model,
            max_tokens=1024,
            system=self.system_message,
            messages=self.messages,
            temperature=0.1,
        )

        # Store assistant's response in short-term memory
        self.messages.append({"role": "assistant", "content": response.content})

        return response
```

现在，让我们用之前的对话示例再次测试该智能体。

```python3
agent = Agent()

response = agent.chat("I have 4 apples. How many do you have?")
print(response.content[0].text)

response = agent.chat("I ate 1 apple. How many are left?")
print(response.content[0].text)
```

```text
I don't have any apples - as an AI, I don't have a physical form and can't possess physical objects like apples. You have 4 apples, and I have 0 apples.

Is there something you'd like to do with your 4 apples, like a math problem or recipe suggestion?
Let me solve this step by step:

**Step 1:** Identify the starting amount
- You started with 4 apples

**Step 2:** Identify what was consumed
- You ate 1 apple

**Step 3:** Calculate the remaining amount
- Apples left = Starting amount - Apples eaten
- Apples left = 4 - 1 = 3

**Answer:** You have 3 apples left.
```

如你所见，该智能体（Agent）现在已经能够进行对话并引用之前的信息了。

但是，如果你交给智能体一个稍微复杂一点的数学题，会发生什么呢？

```python3
agent = Agent()

response = agent.chat("What is 157.09 * 493.89?")

print(response.content[0].text)
```

```text
I'll solve this step by step using the standard multiplication algorithm.

157.09 × 493.89

First, let me multiply 157.09 by each digit of 493.89:

**Step 1:** 157.09 × 9 (ones place)
157.09 × 9 = 1,413.81

**Step 2:** 157.09 × 80 (tens place)
157.09 × 8 = 1,256.72
1,256.72 × 10 = 12,567.2

**Step 3:** 157.09 × 300 (hundreds place)
157.09 × 3 = 471.27
471.27 × 100 = 47,127

**Step 4:** 157.09 × 90,000 (ten-thousands place)
157.09 × 9 = 1,413.81
1,413.81 × 10,000 = 14,138,100

**Step 5:** 157.09 × 400,000 (hundred-thousands place)
157.09 × 4 = 628.36
628.36 × 100,000 = 62,836,000

**Step 6:** Add all partial products:

    1,413.81
   12,567.2
   47,127
14,138,100
62,836,000
-----------
77,035,208.01


Therefore, **157.09 × 493.89 = 77,035.2081**
```

该智能体的回答听起来完全可信，但如果你去验证一下，你就会发现即使是像  Claude 4 Sonnet 这样强大的大语言模型（LLM），在没有工具辅助的情况下，仍然会犯算术错误。

```python3
157.09 * 493.89
# 77585.1801
```

## 组件 3：工具调用 (Tool Use)

为了扩展智能体的能力，你可以为其提供工具，这些工具的范围涵盖从简单的函数到调用外部 API。在本教程中，我们将实现一个简单的 CalculatorTool 类，用于处理数学问题。

虽然不同供应商对工具使用的具体实现方式有所不同，但在核心层面上，始终需要两个关键组件：

函数实现（Function implementation）：这是执行工具逻辑的实际代码，例如执行计算或进行 API 调用。

工具模式（Tool schema）：工具的结构化描述。工具描述非常重要，因为它会告知大语言模型（LLM）该工具的功能、何时应该使用它以及它需要哪些参数。

本教程遵循 Anthropic 关于工具使用（Tool use）的文档。如果你在学习本教程时使用的是不同的大语言模型 API，我建议你查阅该 LLM 供应商关于工具使用的相关文档。

```python3
class CalculatorTool():
    """A tool for performing mathematical calculations"""

    def get_schema(self):
        return {
            "name": "calculator",
            "description": "Performs basic mathematical calculations, use also for simple additions",
            "input_schema": {
                "type": "object",
                "properties": {
                    "expression": {
                        "type": "string",
                        "description": "Mathematical expression to evaluate (e.g., '2+2', '10*5')"
                    }
                },
                "required": ["expression"]
            }
        }

    def execute(self, expression):
        """
        Evaluate mathematical expressions.
        WARNING: This tutorial uses eval() for simplicity but it is not recommended for production use.

        Args:
            expression (str): The mathematical expression to evaluate
        Returns:
            float: The result of the evaluation
        """
        try:
            result = eval(expression)
            return {"result": result}
        except:
            return {"error": "Invalid mathematical expression"}
```

请注意，在本教程中，我们仅实现了一个单一工具。在生产环境的代码中，你通常会使用 **抽象基类（abstract base class）** 来确保所有工具之间拥有一致的接口。

让我们测试一下这个计算器函数是否正常工作。

```python3
calculator_tool = CalculatorTool()

calculator_tool.execute("157.09 * 493.89")

# {'result': 77585.1801}
```

既然我们已经有了一个 CalculatorTool，现在让我们分三个步骤为智能体添加工具使用能力：

1. 添加 `tools` 和 `tool_map` 属性，用于存储可用的工具。

2. 添加私有的 `_get_tool_schemas()` 方法，用于提取工具的模式（Schemas）。

3. 在 `create` 方法中添加工具处理逻辑，用于检测并处理工具调用。

```python3
class Agent:
    """A simple AI agent that can use tools to answer questions in a multi-turn conversation"""

    def __init__(self, tools):
        self.client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.model = "claude-sonnet-4-20250514"
        self.system_message = "You are a helpful assistant that breaks down problems into steps and solves them systematically."
        self.messages = []
        self.tools = tools
        self.tool_map = {tool.get_schema()["name"]: tool for tool in tools}

    def _get_tool_schemas(self):
        """Get tool schemas for all registered tools"""
        return [tool.get_schema() for tool in self.tools]

    def chat(self, message):
        """Process a user message and return a response"""

        # Store user input in short-term memory
        self.messages.append({"role": "user", "content": message})

        response = self.client.messages.create(
            model=self.model,
            max_tokens=1024,
            system=self.system_message,
            tools=self._get_tool_schemas() if self.tools else None,
            messages=self.messages,
            temperature=0.1,
        )

        # Store assistant's response in short-term memory
        self.messages.append({"role": "assistant", "content": response.content})

        return response
```

让我们来试一试。

```python3
calculator_tool = CalculatorTool()
agent = Agent(tools=[calculator_tool])

response = agent.chat("What is 157.09 * 493.89?")

for block in response:
  print(block)
```

```text
('id', 'msg_01BzC2FerKEr8rC1wGfaMiNK')
('content', [TextBlock(citations=None, text="I'll calculate 157.09 * 493.89 for you.", type='text'), ToolUseBlock(id='toolu_017NhVhd5wYWdEw7fFRPHyXL', input={'expression': '157.09 * 493.89'}, name='calculator', type='tool_use')])
('model', 'claude-sonnet-4-20250514')
('role', 'assistant')
('stop_reason', 'tool_use')
('stop_sequence', None)
('type', 'message')
('usage', Usage(cache_creation=CacheCreation(ephemeral_1h_input_tokens=0, ephemeral_5m_input_tokens=0), cache_creation_input_tokens=0, cache_read_input_tokens=0, input_tokens=433, output_tokens=77, server_tool_use=None, service_tier='standard'))

```

正如你在响应（response）中看到的，智能体回答道：“I’ll calculate 157.09 * 493.89 for you.”但它并没有自己去计算这个表达式，而是停了下来，其 stop_reason（停止原因）显示为 tool_use。这意味着，智能体正在等待用户去执行该工具，并将工具的运行结果返回给它。

由于智能体已经做出了响应，表示它需要协助来执行工具并处于等待状态。这时，循环（loop）的最后一个组件就该发挥作用了。

## 组件 4：Agent 循环(Agent Loop)

你可能已经听过有人说过这样一句话：“Agent 就是一个在循环中使用工具的模型（Agents are models using tools in a loop）。” 如果没有这个“循环”，Agent 其实只能处理单轮请求，无法进行多轮交互。

我非常喜欢 Anthropic 的 Barry Zhan 给出的这段伪代码，它很好地说明了：Agent 本质上就是一个在循环中做决策的 LLM —— 观察结果，然后决定下一步该做什么。

```python3
env = Environment()
tools = Tools(env)
system_prompt = "Goals, constraints, and how to act"

while True:
  action = llm.run(system_prompt + env.state)
  env.state = tools.run(action)
```

对于这个简单的 Agent 实现来说，整体流程如下：

1. 用户向 Agent 发送消息
2. Agent 判断自己需要调用某个工具，并返回一个 stop_reason = tool_use 的响应，同时包含一个 tool_use 块，里面给出工具名称和参数。
这一步的含义是：“我先停在这里，请你用这些参数去执行这个工具。”
3. 用户执行该工具，并在下一条消息中把工具的执行结果返回给 Agent
4. Agent 继续执行，并给出最终回复

```python3
import json

def run_agent(user_input, max_turns=10):
  calculator_tool = CalculatorTool()
  agent = Agent(tools=[calculator_tool])

  i = 0

  while i < max_turns: # It's safer to use max_turns rather than while True
    i += 1
    print(f"\nIteration {i}:")

    print(f"User input: {user_input}")
    response = agent.chat(user_input)
    print(f"Agent output: {response.content[0].text}")

    # Handle tool use if present
    if response.stop_reason == "tool_use":

        # Process all tool uses in the response
        tool_results = []
        for content_block in response.content:
            if content_block.type == "tool_use":
                tool_name = content_block.name
                tool_input = content_block.input

                print(f"Using tool {tool_name} with input {tool_input}")

                # Execute the tool
                tool = agent.tool_map[tool_name]
                tool_result = tool.execute(**tool_input)

                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": content_block.id,
                    "content": json.dumps(tool_result)
                })
                print(f"Tool result: {tool_result}")

        # Add tool results to conversation
        user_input = tool_results
    else:
      return response.content[0].text

  return
```

### 测试已实现的 AI Agent

下面通过几个示例测试用例来验证这个 AI Agent 的行为。

#### 测试 1：通用问题（不使用工具）

这个测试展示了 Agent 在不需要调用任何外部工具的情况下，回答一个简单通用问题的能力。

```python3
response = run_agent("I have 4 apples. How many do you have?")
```

```text
Iteration 1:
User input: I have 4 apples. How many do you have?
Agent output: I don't have any apples since I'm an AI assistant - I don't have a physical form or possessions. But I can help you with calculations involving your 4 apples if you need!

Is there something specific you'd like to calculate or figure out with your 4 apples?
```

#### 测试2: 工具使用

这个测试展示了 Agent 如何理解为了完成一个特定任务，它需要使用工具，并且能够调用 `CalculatorTool` 来得到正确的计算结果。

```python3
response = run_agent("What is 157.09 * 493.89?")
```

```text
Iteration 1:
User input: What is 157.09 * 493.89?
Agent output: I'll calculate 157.09 * 493.89 for you.
Using tool calculator with input {'expression': '157.09 * 493.89'}
Tool result: {'result': 77585.1801}

Iteration 2:
User input: [{'type': 'tool_result', 'tool_use_id': 'toolu_01FC9yLWt2Cf6a8zLGhj7ZJz', 'content': '{"result": 77585.1801}'}]
Agent output: The result of 157.09 * 493.89 is **77,585.1801**.
```

#### 测试 3：分步骤使用工具

这个测试展示了 Agent 将一个更复杂的问题拆解为多个更小的步骤的能力，并且能够在同一次对话中多次使用 CalculatorTool，最终得到正确答案。

```python3
response = run_agent("If my brother is 32 years younger than my mother and my mother is 30 years older than me and I am 20, how old is my brother?")
```

```text
Iteration 1:
User input: If my brother is 32 years younger than my mother and my mother is 30 years older than me and I am 20, how old is my brother?
Agent output: I'll solve this step by step using the given information.

Given:
- You are 20 years old
- Your mother is 30 years older than you
- Your brother is 32 years younger than your mother

Let me calculate your mother's age first:
Using tool calculator with input {'expression': '20 + 30'}
Tool result: {'result': 50}

Iteration 2:
User input: [{'type': 'tool_result', 'tool_use_id': 'toolu_01WPMQRzCi4roua9vQ7qXeCR', 'content': '{"result": 50}'}]
Agent output: So your mother is 50 years old.

Now I'll calculate your brother's age:
Using tool calculator with input {'expression': '50 - 32'}
Tool result: {'result': 18}

Iteration 3:
User input: [{'type': 'tool_result', 'tool_use_id': 'toolu_01UL7n7a85XJUn7Tgk8kiHhX', 'content': '{"result": 18}'}]
Agent output: Your brother is 18 years old.

To summarize:
- You: 20 years old
- Your mother: 50 years old (30 years older than you)
- Your brother: 18 years old (32 years younger than your mother)
```

## 总结

本教程向你展示了如何在不依赖任何框架的情况下，仅使用一个 LLM API，从零实现一个最小可用的 AI Agent。

希望通过这个过程，你已经理解了 AI Agent 在底层是如何工作的，也明白了人们所说的那句话：

“Agent 是在循环中使用工具的模型（Agents are models using tools in a loop）。”


### 参考资源

* [Anthropic’s Building Effective Agents Cookbook](https://github.com/anthropics/claude-cookbooks/tree/main/patterns/agents)
* [Build an AI Agent from SCRATCH with Python! (No Frameworks) by Aaron Dunn](https://www.youtube.com/watch?v=mYo7UFwnW1k)
* [Building Effective LLM Workflows in Pure Python by Dave Ebbelaar](https://github.com/daveebbelaar/ai-cookbook/tree/main/patterns)
