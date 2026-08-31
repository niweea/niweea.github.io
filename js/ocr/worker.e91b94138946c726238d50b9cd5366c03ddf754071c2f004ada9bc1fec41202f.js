var It=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var Hn=Object.defineProperty,o0=Object.getOwnPropertyDescriptor,u0=Object.getOwnPropertyNames,l0=Object.prototype.hasOwnProperty,d0=(e=>typeof It<"u"?It:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof It<"u"?It:t)[r]}):e)(function(e){if(typeof It<"u")return It.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),L=(e,t,r)=>()=>{if(r)throw r[0];try{return e&&(t=e(e=0)),t}catch(i){throw r=[i],i}},Xt=(e,t)=>{for(var r in t)Hn(e,r,{get:t[r],enumerable:!0})},p0=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of u0(t))!l0.call(e,n)&&n!==r&&Hn(e,n,{get:()=>t[n],enumerable:!(i=o0(t,n))||i.enumerable});return e},gr=e=>p0(Hn({},"__esModule",{value:!0}),e),tr,gt,Ft,_o,np,ap=L(()=>{"use strict";tr=new Map,gt=[],Ft=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=tr.get(e);if(i===void 0)tr.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=gt.indexOf(e);n!==-1&&gt.splice(n,1);for(let a=0;a<gt.length;a++)if(tr.get(gt[a]).priority<=r){gt.splice(a,0,e);return}gt.push(e)}return}throw new TypeError("not a valid backend")},_o=async e=>{let t=tr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},np=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?gt:r,n,a=[],s=new Set;for(let l of i){let p=await _o(l);typeof p=="string"?a.push({name:l,err:p}):(n||(n=p),n===p&&s.add(l))}if(!n)throw new Error(`no available backend found. ERR: ${a.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of a)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let u=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[n,new Proxy(e,{get:(l,p)=>p==="executionProviders"?u:Reflect.get(l,p)})]}}),c0=L(()=>{"use strict";ap()}),sp,h0=L(()=>{"use strict";sp="1.29.0"}),Ei,Re,op=L(()=>{"use strict";h0(),Ei="warning",Re={wasm:{},webgl:{},webgpu:{},versions:{common:sp},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Ei=e}},get logLevel(){return Ei}},Object.defineProperty(Re,"logLevel",{enumerable:!0})}),be,f0=L(()=>{"use strict";op(),be=Re}),up,lp,m0=L(()=>{"use strict";up=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[3]):(n=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,p;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?p=[0,0,0,0]:typeof u.bias=="number"?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(p[3]=u.bias[3]));let c=a*n,f=0,g=c,b=c*2,_=-1;s==="RGBA"?(f=0,g=c,b=c*2,_=c*3):s==="RGB"?(f=0,g=c,b=c*2):s==="RBG"&&(f=0,b=c,g=c*2);for(let v=0;v<a;v++)for(let T=0;T<n;T++){let k=(e.data[f++]-p[0])*l[0],$=(e.data[g++]-p[1])*l[1],E=(e.data[b++]-p[2])*l[2],I=_===-1?255:(e.data[_++]-p[3])*l[3];i.fillStyle="rgba("+k+","+$+","+E+","+I+")",i.fillRect(T,v,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},lp=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[1],s=e.dims[3]):(n=e.dims[3],a=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,c;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let f=a*n;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,b=0,_=1,v=2,T=3,k=0,$=f,E=f*2,I=-1;u==="RGBA"?(k=0,$=f,E=f*2,I=f*3):u==="RGB"?(k=0,$=f,E=f*2):u==="RBG"&&(k=0,E=f,$=f*2),i=r.createImageData(n,a);for(let C=0;C<a*n;b+=g,_+=g,v+=g,T+=g,C++)i.data[b]=(e.data[k++]-c[0])*p[0],i.data[_]=(e.data[$++]-c[1])*p[1],i.data[v]=(e.data[E++]-c[2])*p[2],i.data[T]=I===-1?255:(e.data[I++]-c[3])*p[3]}else throw new Error("Can not access image data");return i}}),Ar,dp,pp,cp,hp,fp,g0=L(()=>{"use strict";Fn(),Ar=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},a,s;typeof n.mean=="number"?a=[n.mean,n.mean,n.mean,n.mean]:a=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?s=[n.bias,n.bias,n.bias,n.bias]:s=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*i,c=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),f=4,g=0,b=1,_=2,v=3,T=0,k=p,$=p*2,E=-1;u==="RGB"&&(f=3,g=0,b=1,_=2,v=-1),l==="RGBA"?E=p*3:l==="RBG"?(T=0,$=p,k=p*2):l==="BGR"&&($=0,k=p,T=p*2);for(let I=0;I<p;I++,g+=f,_+=f,b+=f,v+=f)c[T++]=(e[g]+s[0])/a[0],c[k++]=(e[b]+s[1])/a[1],c[$++]=(e[_]+s[2])/a[2],E!==-1&&v!==-1&&(c[E++]=(e[v]+s[3])/a[3]);return l==="RGBA"?new Ue("float32",c,[1,4,r,i]):new Ue("float32",c,[1,3,r,i])},dp=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=l();c.width=e.width,c.height=e.height;let f=p(c);if(f!=null){let g=e.height,b=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,b=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=b}else u.tensorFormat="RGBA",u.height=g,u.width=b;f.drawImage(e,0,0),s=f.getImageData(0,0,b,g).data}else throw new Error("Can not access image data")}else if(i){let c,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,f=t.resizedWidth):(c=e.height,f=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=c,u.width=f,t!==void 0){let g=l();g.width=f,g.height=c;let b=p(g);if(b!=null)b.putImageData(e,0,0),s=b.getImageData(0,0,f,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=l();c.width=e.width,c.height=e.height;let f=p(c);if(f!=null){let g=e.height,b=e.width;return f.drawImage(e,0,0,b,g),s=f.getImageData(0,0,b,g).data,u.height=g,u.width=b,Ar(s,u)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,f)=>{let g=l(),b=p(g);if(!e||!b)return f();let _=new Image;_.crossOrigin="Anonymous",_.src=e,_.onload=()=>{g.width=_.width,g.height=_.height,b.drawImage(_,0,0,g.width,g.height);let v=b.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,c(Ar(v.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Ar(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},pp=(e,t)=>{let{width:r,height:i,download:n,dispose:a}=t,s=[1,i,r,4];return new Ue({location:"texture",type:"float32",texture:e,dims:s,download:n,dispose:a})},cp=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new Ue({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:a})},hp=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new Ue({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:a})},fp=(e,t,r)=>new Ue({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Rt,cr,zi,mp,y0=L(()=>{"use strict";Rt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),cr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),zi=!1,mp=()=>{if(!zi){zi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Rt.set("int64",BigInt64Array),cr.set(BigInt64Array,"int64")),t&&(Rt.set("uint64",BigUint64Array),cr.set(BigUint64Array,"uint64")),i?(Rt.set("float16",r),cr.set(r,"float16")):Rt.set("float16",Uint16Array)}}}),gp,yp,_0=L(()=>{"use strict";Fn(),gp=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},yp=(e,t)=>{switch(e.location){case"cpu":return new Ue(e.type,e.data,t);case"cpu-pinned":return new Ue({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ue({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ue({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ue({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ue,Fn=L(()=>{"use strict";m0(),g0(),y0(),_0(),Ue=class{constructor(e,t,r){mp();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let s=Rt.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=Rt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",s=e;else if(l==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let l=cr.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");n=u,this.cpuData=s,this.dataLocation="cpu"}let a=gp(n);if(this.cpuData&&a!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=a}static async fromImage(e,t){return dp(e,t)}static fromTexture(e,t){return pp(e,t)}static fromGpuBuffer(e,t){return cp(e,t)}static fromMLTensor(e,t){return hp(e,t)}static fromPinnedBuffer(e,t,r){return fp(e,t,r)}toDataURL(e){return up(this,e)}toImageData(e){return lp(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return yp(this,e)}}}),Pe,_p=L(()=>{"use strict";Fn(),Pe=Ue}),jr,Ci,rt,Qe,Dt,Nt,bp=L(()=>{"use strict";op(),jr=(e,t)=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ci=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let n=0;n<r.length;n++){if(i&&!r[n].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(a+=`::${t}`),jr("CPU",a);return}r[n].includes("TRACE_FUNC")&&(i=!0)}},rt=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||Ci("BEGIN",e)},Qe=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||Ci("END",e)},Dt=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||console.time(`ORT::${e}`)},Nt=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||console.timeEnd(`ORT::${e}`)}}),wp,b0=L(()=>{"use strict";ap(),_p(),bp(),wp=class $p{constructor(t){this.handler=t}async run(t,r,i){rt(),Dt("InferenceSession.run");let n={},a={};if(typeof t!="object"||t===null||t instanceof Pe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Pe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);n[p]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,c=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(c.indexOf(f)!==-1){let g=r[f];(g===null||g instanceof Pe)&&(p=!0,s=!1,n[f]=g)}if(p){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(s)for(let p of this.outputNames)n[p]=null;let u=await this.handler.run(t,n,a),l={};for(let p in u)if(Object.hasOwnProperty.call(u,p)){let c=u[p];c instanceof Pe?l[p]=c:l[p]=new Pe(c.type,c.data,c.dims)}return Nt("InferenceSession.run"),Qe(),l}async release(){return this.handler.dispose()}static async create(t,r,i,n){rt(),Dt("InferenceSession.create");let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,f=0,g=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(g=t.byteLength-f,typeof i=="number"){if(g=i,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||f+g>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-f}].`);if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,f,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await np(s),p=await u.createInferenceSessionHandler(a,l);return Nt("InferenceSession.create"),Qe(),new $p(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ut,w0=L(()=>{"use strict";b0(),ut=wp}),$0=L(()=>{"use strict"}),v0=L(()=>{"use strict"}),x0=L(()=>{"use strict"}),S0=L(()=>{"use strict"}),k0={};Xt(k0,{InferenceSession:()=>ut,TRACE:()=>jr,TRACE_EVENT_BEGIN:()=>Dt,TRACE_EVENT_END:()=>Nt,TRACE_FUNC_BEGIN:()=>rt,TRACE_FUNC_END:()=>Qe,Tensor:()=>Pe,env:()=>be,registerBackend:()=>Ft});var Ve=L(()=>{"use strict";c0(),f0(),w0(),_p(),$0(),v0(),bp(),x0(),S0()}),jn=L(()=>{"use strict"}),vp={};Xt(vp,{default:()=>xp});var Ai,Oi,xp,T0=L(()=>{"use strict";Of(),Lt(),Kn(),Ai="ort-wasm-proxy-worker",Oi=globalThis.self?.name===Ai,Oi&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Zn(r.wasm).then(()=>{ca(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:n}=r;ha(n,i).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:i}=r,n=ei(i);postMessage({type:t,out:n});break}case"create":{let{model:i,options:n}=r;fa(i,n).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":ma(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:n,inputs:a,outputIndices:s,options:u}=r;ga(i,n,a,s,new Array(s.length).fill(null),u).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},_a([...a,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":ya(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),xp=Oi?null:e=>new Worker(e??Ne,{type:"module",name:Ai})}),Sp={};Xt(Sp,{default:()=>kp});async function bo(e={}){var t=e,r=!!globalThis.window,i=!!globalThis.WorkerGlobalScope,n=i&&self.name?.startsWith("em-pthread");t.mountExternalData=(o,d)=>{o.startsWith("./")&&(o=o.substring(2)),(t.Yc||(t.Yc=new Map)).set(o,d)},t.unmountExternalData=()=>{delete t.Yc,delete t.Zd,delete t.Yd,delete t.$d},globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let a=o=>async(...d)=>{try{if(t.Xc)throw Error("Session already started");let y=t.Xc={Kd:d[0],errors:[]},m=await o(...d);if(t.Xc!==y)throw Error("Session mismatch");t.dd?.flush();let S=y.errors;if(0<S.length){let z=await Promise.all(S);if(z=z.filter(M=>M),0<z.length)throw Error(z.join(`
`))}return m}finally{t.Xc=null}};t.jsepInit=(o,d)=>{if(o==="webgpu"){[t.dd,t.Ad,t.Ed,t.ed,t.Dd,t.$b,t.Fd,t.Hd,t.Bd,t.Cd,t.Gd]=d;let y=t.dd;t.jsepRegisterBuffer=(m,S,z,M)=>y.registerBuffer(m,S,z,M),t.jsepGetBuffer=m=>y.getBuffer(m),t.jsepCreateDownloader=(m,S,z)=>y.createDownloader(m,S,z),t.jsepOnCreateSession=m=>{y.onCreateSession(m)},t.jsepOnReleaseSession=m=>{y.onReleaseSession(m)},t.jsepOnRunStart=m=>y.onRunStart(m),t.Id=(m,S)=>{y.upload(m,S)}}else if(o==="webnn"){let y=d[0];[t.Sd,t.sd,t.webnnEnsureTensor,t.td,t.webnnDownloadTensor,t.Rd,t.webnnEnableTraceEvent]=d.slice(1),t.webnnReleaseTensorId=t.sd,t.webnnUploadTensor=t.td,t.webnnRegisterMLContext=t.Rd,t.webnnOnRunStart=m=>y.onRunStart(m),t.webnnOnRunEnd=y.onRunEnd.bind(y),t.webnnOnReleaseSession=m=>{y.onReleaseSession(m)},t.webnnCreateMLTensorDownloader=(m,S)=>y.createMLTensorDownloader(m,S),t.webnnRegisterMLTensor=(m,S,z,M)=>y.registerMLTensor(m,S,z,M),t.webnnCreateMLContext=m=>y.createMLContext(m),t.webnnRegisterGraphInput=y.registerGraphInput.bind(y),t.webnnIsGraphInput=y.isGraphInput.bind(y),t.webnnRegisterGraphOutput=y.registerGraphOutput.bind(y),t.webnnIsGraphOutput=y.isGraphOutput.bind(y),t.webnnCreateTemporaryTensor=y.createTemporaryTensor.bind(y),t.webnnIsGraphInputOutputTypeSupported=y.isGraphInputOutputTypeSupported.bind(y)}};let s=()=>{let o=d=>(...y)=>{let m=Je;return y=d(...y),Je!=m?new Promise((S,z)=>{mi={resolve:S,reject:z}}):y};(()=>{for(let d of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])t[d]=o(t[d])})(),a!==void 0&&(t._OrtRun=a(t._OrtRun),t._OrtRunWithBinding=a(t._OrtRunWithBinding)),s=void 0};t.asyncInit=()=>{s?.()};var u,l,p=(o,d)=>{throw d},c=import.meta.url,f="";if(r||i){try{f=new URL(".",c).href}catch{}i&&(l=o=>{var d=new XMLHttpRequest;return d.open("GET",o,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),u=async o=>{if(R(o))return new Promise((y,m)=>{var S=new XMLHttpRequest;S.open("GET",o,!0),S.responseType="arraybuffer",S.onload=()=>{S.status==200||S.status==0&&S.response?y(S.response):m(S.status)},S.onerror=m,S.send(null)});var d=await fetch(o,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)}}var g,b,_,v,T,k,$=console.log.bind(console),E=console.error.bind(console),I=$,C=E,A=!1,R=o=>o.startsWith("file://");function x(){ct.buffer!=H.buffer&&K()}if(n){let o=function(d){try{var y=d.data,m=y.Sc;if(m==="load"){let S=[];self.onmessage=z=>S.push(z),k=()=>{postMessage({Sc:"loaded"});for(let z of S)o(z);self.onmessage=o};for(let z of y.xd)t[z]&&!t[z].proxy||(t[z]=(...M)=>{postMessage({Sc:"callHandler",vd:z,args:M})},z=="print"&&(I=t[z]),z=="printErr"&&(C=t[z]));ct=y.Od,K(),b=y.Pd,ve(),Cr()}else if(m==="run"){(function(S){var z=(x(),q)[S+52>>>2>>>0];S=(x(),q)[S+56>>>2>>>0],Is(z,z-S),le(z)})(y.Rc),wi(y.Rc,0,0,1,0,0),Ea(),ci(y.Rc),V||($s(),V=!0);try{Qf(y.Md,y.bd)}catch(S){if(S!="unwind")throw S}}else y.target!=="setimmediate"&&(m==="checkMailbox"?V&&xr():m&&(C(`worker: received unknown command ${m}`),C(y)))}catch(S){throw vs(),S}};var U=o,V=!1;self.onunhandledrejection=d=>{throw d.reason||d},self.onmessage=o}var H,W,F,re,O,q,ee,te,Y,oe,P,ie=!1;function K(){var o=ct.buffer;t.HEAP8=H=new Int8Array(o),F=new Int16Array(o),t.HEAPU8=W=new Uint8Array(o),re=new Uint16Array(o),t.HEAP32=O=new Int32Array(o),t.HEAPU32=q=new Uint32Array(o),ee=new Float32Array(o),te=new Float64Array(o),Y=new BigInt64Array(o),oe=new BigUint64Array(o)}function Z(){ie=!0,n?k():nt.sb()}function _e(o){throw C(o="Aborted("+o+")"),A=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),T?.(o),o}function Ee(){return{a:{ma:vg,hb:$g,g:Yf,J:Jf,f:em,o:tm,i:rm,$:im,b:nm,S:am,Ia:Ma,n:sm,aa:Ua,Ya:Pa,Ea:qa,Ga:La,Za:Wa,Wa:Va,Pa:Ga,Va:Ha,ka:Fa,Fa:ja,Ca:Ka,Xa:Za,Da:Xa,cb:om,fa:lm,xa:dm,va:cm,ea:fm,N:mm,H:gm,wa:ym,_:Sm,ya:km,Sa:Tm,Aa:Em,Ja:zm,ta:Cm,ga:Am,Ra:ci,$a:Om,Q:Dm,r:Lm,c:di,ib:Wm,y:Vm,M:Gm,D:Hm,l:Fm,s:ns,jb:jm,I:Km,R:Zm,j:Xm,u:Qm,q:Ym,k:Jm,Ma:eg,Na:tg,Oa:rg,Ka:us,La:ls,ua:ds,eb:ng,bb:og,v:ug,ba:lg,ha:dg,ab:ag,V:pg,_a:cg,Ba:hg,F:ig,T:fg,la:Er,za:gg,gb:mg,fb:yg,Ta:fs,Ua:ms,Ha:ai,U:gs,ja:ys,Qa:_s,ia:bs,lb:n0,na:Jg,mb:i0,oa:Yg,G:Wg,e:Tg,t:Sg,w:xg,B:Dg,nb:Zg,Z:Kg,x:zg,pa:Xg,X:e0,ca:jg,ob:Fg,pb:Hg,O:Ng,qa:Gg,qb:Vg,L:qg,Y:Qg,d:kg,A:Eg,m:Ig,kb:a0,p:Ag,z:Og,C:Cg,E:Rg,K:Ug,ra:Lg,P:t0,da:Pg,W:r0,rb:Bg,sa:Mg,h:bg,a:ct,db:ni}}}async function ve(){function o(m,S){var z=nt=m.exports;m={};for(let[M,N]of Object.entries(z))typeof N=="function"?(z=Rm(N),m[M]=z):m[M]=N;return nt=m,nt=(function(){var M=nt,N=j=>ue=>j(ue)>>>0,G=j=>()=>j()>>>0;return(M=Object.assign({},M)).tb=N(M.tb),M.Xb=G(M.Xb),M.Zb=N(M.Zb),M.lc=N(M.lc),M.mc=G(M.mc),M.qc=N(M.qc),M})(),Ta.push(nt._b),ws=(m=nt).tb,$s=m.ub,t._OrtInit=m.vb,t._OrtGetLastError=m.wb,t._OrtCreateSessionOptions=m.xb,t._OrtAppendExecutionProvider=m.yb,t._OrtAddFreeDimensionOverride=m.zb,t._OrtAddSessionConfigEntry=m.Ab,t._OrtReleaseSessionOptions=m.Bb,t._OrtCreateSession=m.Cb,t._OrtReleaseSession=m.Db,t._OrtGetInputOutputCount=m.Eb,t._OrtGetInputOutputMetadata=m.Fb,t._OrtFree=m.Gb,t._OrtCreateTensor=m.Hb,t._OrtGetTensorData=m.Ib,t._OrtReleaseTensor=m.Jb,t._OrtCreateRunOptions=m.Kb,t._OrtAddRunConfigEntry=m.Lb,t._OrtReleaseRunOptions=m.Mb,t._OrtCreateBinding=m.Nb,t._OrtBindInput=m.Ob,t._OrtBindOutput=m.Pb,t._OrtClearBoundOutputs=m.Qb,t._OrtReleaseBinding=m.Rb,t._OrtRunWithBinding=m.Sb,t._OrtRun=m.Tb,t._OrtEndProfiling=m.Ub,t._JsepOutput=m.Vb,t._JsepGetNodeName=m.Wb,zr=m.Xb,et=t._free=m.Yb,Jt=t._malloc=m.Zb,wi=m.ac,vs=m.bc,xs=m.cc,Ss=m.dc,$i=m.ec,ks=m.fc,Ts=m.gc,pe=m.hc,er=m.ic,Is=m.jc,le=m.kc,vi=m.lc,de=m.mc,Es=m.nc,xi=m.oc,zs=m.pc,Cs=m.qc,As=m.rc,Si=m.sc,Os=m.tc,Rs=m.uc,Ms=m.vc,Bs=m.wc,Ds=m.xc,Ns=m.yc,Us=m.zc,Ps=m.Ac,qs=m.Bc,Ls=m.Cc,Ws=m.Dc,Vs=m.Ec,Gs=m.Fc,Hs=m.Gc,Fs=m.Hc,js=m.Ic,Ks=m.Jc,Zs=m.Kc,Xs=m.Lc,Qs=m.Mc,Ys=m.Nc,Js=m.Pc,eo=m.Qc,to=m.$c,ro=m.ad,io=m.fd,no=m.kd,ao=m.ld,so=m.md,oo=m.nd,uo=m.od,lo=m.pd,po=m.qd,co=m.rd,ho=m.wd,fo=m.Ud,mo=m.Vd,go=m.Wd,yo=m.Xd,b=S,nt}var d,y=Ee();return t.instantiateWasm?new Promise(m=>{t.instantiateWasm(y,(S,z)=>{m(o(S,z))})}):n?o(new WebAssembly.Instance(b,Ee()),b):(P??=t.locateFile?t.locateFile?t.locateFile("ort-wasm-simd-threaded.jsep.wasm",f):f+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,d=await(async function(m){var S=P;if(!g&&!R(S))try{var z=fetch(S,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(z,m)}catch(M){C(`wasm streaming compile failed: ${M}`),C("falling back to ArrayBuffer instantiation")}return(async function(M,N){try{var G=await(async function(j){if(!g)try{var ue=await u(j);return new Uint8Array(ue)}catch{}if(j==P&&g)j=new Uint8Array(g);else{if(!l)throw"both async and sync fetching of the wasm failed";j=l(j)}return j})(M);return await WebAssembly.instantiate(G,N)}catch(j){C(`failed to asynchronously prepare wasm: ${j}`),_e(j)}})(S,m)})(y),o(d.instance,d.module))}class Oe{name="ExitStatus";constructor(d){this.message=`Program terminated with exit(${d})`,this.status=d}}var ye=o=>{o.terminate(),o.onmessage=()=>{}},ke=[],De=0,xt=null,_r=o=>{pt.length==0&&(Ca(),za(pt[0]));var d=pt.pop();if(!d)return 6;Qt.push(d),St[o.Rc]=d,d.Rc=o.Rc;var y={Sc:"run",Md:o.Ld,bd:o.bd,Rc:o.Rc};return d.postMessage(y,o.jd),0},dt=0,Se=(o,d,...y)=>{var m,S=16*y.length,z=de(),M=vi(S),N=M>>>3;for(m of y)typeof m=="bigint"?((x(),Y)[N++>>>0]=1n,(x(),Y)[N++>>>0]=m):((x(),Y)[N++>>>0]=0n,(x(),te)[N++>>>0]=m);return o=xs(o,0,S,M,d),le(z),o};function ni(o){if(n)return Se(0,1,o);if(_=o,!(0<dt)){for(var d of Qt)ye(d);for(d of pt)ye(d);pt=[],Qt=[],St={},A=!0}p(0,new Oe(o))}function ka(o){if(n)return Se(1,0,o);ai(o)}var ai=o=>{if(_=o,n)throw ka(o),"unwind";ni(o)},pt=[],Qt=[],Ta=[],St={},Ia=o=>{var d=o.Rc;delete St[d],pt.push(o),Qt.splice(Qt.indexOf(o),1),o.Rc=0,Ss(d)};function Ea(){Ta.forEach(o=>o())}var za=o=>new Promise(d=>{o.onmessage=S=>{var z=S.data;if(S=z.Sc,z.Zc&&z.Zc!=zr()){var M=St[z.Zc];M?M.postMessage(z,z.jd):C(`Internal error! Worker sent a message "${S}" to target pthread ${z.Zc}, but that thread no longer exists!`)}else S==="checkMailbox"?xr():S==="spawnThread"?_r(z):S==="cleanupThread"?vr(()=>{Ia(St[z.Nd])}):S==="loaded"?(o.loaded=!0,d(o)):z.target==="setimmediate"?o.postMessage(z):S==="uncaughtException"?o.onerror(z.error):S==="callHandler"?t[z.vd](...z.args):S&&C(`worker sent an unknown command ${S}`)},o.onerror=S=>{throw C(`worker sent an error! ${S.filename}:${S.lineno}: ${S.message}`),S};var y,m=[];for(y of[])t.propertyIsEnumerable(y)&&m.push(y);o.postMessage({Sc:"load",xd:m,Od:ct,Pd:b})});function Ca(){var o=new Worker((()=>{let d=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new d("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});pt.push(o)}var ct,Qf=(o,d)=>{dt=0,o=Si(o,d),0<dt?_=o:$i(o)},br=[],wr=0;function Yf(o){var d=new si(o>>>=0);return(x(),H)[d.Tc+12>>>0]==0&&(Aa(d,!0),wr--),Oa(d,!1),br.push(d),Cs(o)}var Vt=0,Jf=()=>{pe(0,0);var o=br.pop();Es(o.cd),Vt=0};function Aa(o,d){d=d?1:0,(x(),H)[o.Tc+12>>>0]=d}function Oa(o,d){d=d?1:0,(x(),H)[o.Tc+13>>>0]=d}class si{constructor(d){this.cd=d,this.Tc=d-24}}var oi=o=>{var d=Vt;if(!d)return er(0),0;var y=new si(d);(x(),q)[y.Tc+16>>>2>>>0]=d;var m=(x(),q)[y.Tc+4>>>2>>>0];if(!m)return er(0),d;for(var S of o){if(S===0||S===m)break;if(zs(S,m,y.Tc+16))return er(S),d}return er(m),d};function em(){return oi([])}function tm(o){return oi([o>>>0])}function rm(o,d,y,m){return oi([o>>>0,d>>>0,y>>>0,m>>>0])}var im=()=>{var o=br.pop();o||_e("no exception to throw");var d=o.cd;throw(x(),H)[o.Tc+13>>>0]==0&&(br.push(o),Oa(o,!0),Aa(o,!1),wr++),xi(d),Vt=d};function nm(o,d,y){var m=new si(o>>>=0);throw d>>>=0,y>>>=0,(x(),q)[m.Tc+16>>>2>>>0]=0,(x(),q)[m.Tc+4>>>2>>>0]=d,(x(),q)[m.Tc+8>>>2>>>0]=y,xi(o),wr++,Vt=o}var am=()=>wr;function Ra(o,d,y,m){return n?Se(2,1,o,d,y,m):Ma(o,d,y,m)}function Ma(o,d,y,m){if(o>>>=0,d>>>=0,y>>>=0,m>>>=0,!globalThis.SharedArrayBuffer)return 6;var S=[];return n&&S.length===0?Ra(o,d,y,m):(o={Ld:y,Rc:o,bd:m,jd:S},n?(o.Sc="spawnThread",postMessage(o,S),0):_r(o))}function sm(o){throw Vt||=o>>>0,Vt}var Ba=globalThis.TextDecoder&&new TextDecoder,Da=(o,d,y,m)=>{if(y=d+y,m)return y;for(;o[d]&&!(d>=y);)++d;return d},Na=(o,d=0,y,m)=>{if(16<(y=Da(o,d>>>=0,y,m))-d&&o.buffer&&Ba)return Ba.decode(o.buffer instanceof ArrayBuffer?o.subarray(d,y):o.slice(d,y));for(m="";d<y;){var S=o[d++];if(128&S){var z=63&o[d++];if((224&S)==192)m+=String.fromCharCode((31&S)<<6|z);else{var M=63&o[d++];65536>(S=(240&S)==224?(15&S)<<12|z<<6|M:(7&S)<<18|z<<12|M<<6|63&o[d++])?m+=String.fromCharCode(S):(S-=65536,m+=String.fromCharCode(55296|S>>10,56320|1023&S))}}else m+=String.fromCharCode(S)}return m},ze=(o,d,y)=>(o>>>=0)?Na((x(),W),o,d,y):"";function Ua(o,d,y){return n?Se(3,1,o,d,y):0}function Pa(o,d){if(n)return Se(4,1,o,d)}function qa(o,d){if(n)return Se(5,1,o,d)}function La(o,d,y){if(n)return Se(6,1,o,d,y)}function Wa(o,d,y){return n?Se(7,1,o,d,y):0}function Va(o,d){if(n)return Se(8,1,o,d)}function Ga(o,d,y){if(n)return Se(9,1,o,d,y)}function Ha(o,d,y,m){if(n)return Se(10,1,o,d,y,m)}function Fa(o,d,y,m){if(n)return Se(11,1,o,d,y,m)}function ja(o,d,y,m){if(n)return Se(12,1,o,d,y,m)}function Ka(o){if(n)return Se(13,1,o)}function Za(o,d){if(n)return Se(14,1,o,d)}function Xa(o,d,y){if(n)return Se(15,1,o,d,y)}var om=()=>_e(""),Ye=o=>{o>>>=0;for(var d="";;){var y=(x(),W)[o++>>>0];if(!y)return d;d+=String.fromCharCode(y)}},ui={},li={},um={},Gt=class extends Error{constructor(o){super(o),this.name="BindingError"}};function it(o,d,y={}){return(function(m,S,z={}){var M=S.name;if(!m)throw new Gt(`type "${M}" must have a positive integer typeid pointer`);if(li.hasOwnProperty(m)){if(z.yd)return;throw new Gt(`Cannot register type '${M}' twice`)}li[m]=S,delete um[m],ui.hasOwnProperty(m)&&(S=ui[m],delete ui[m],S.forEach(N=>N()))})(o,d,y)}var Qa=(o,d,y)=>{switch(d){case 1:return y?m=>(x(),H)[m>>>0]:m=>(x(),W)[m>>>0];case 2:return y?m=>(x(),F)[m>>>1>>>0]:m=>(x(),re)[m>>>1>>>0];case 4:return y?m=>(x(),O)[m>>>2>>>0]:m=>(x(),q)[m>>>2>>>0];case 8:return y?m=>(x(),Y)[m>>>3>>>0]:m=>(x(),oe)[m>>>3>>>0];default:throw new TypeError(`invalid integer width (${d}): ${o}`)}};function lm(o,d,y,m,S){o>>>=0,y>>>=0,d=Ye(d>>>0);let z=M=>M;if(m=m===0n){let M=8*y;z=N=>BigInt.asUintN(M,N),S=z(S)}it(o,{name:d,Oc:z,Vc:(M,N)=>(typeof N=="number"&&(N=BigInt(N)),N),Uc:Qa(d,y,!m),Wc:null})}function dm(o,d,y,m){it(o>>>=0,{name:d=Ye(d>>>0),Oc:function(S){return!!S},Vc:function(S,z){return z?y:m},Uc:function(S){return this.Oc((x(),W)[S>>>0])},Wc:null})}var Ya=[],kt=[0,1,,1,null,1,!0,1,!1,1];function di(o){9<(o>>>=0)&&--kt[o+1]===0&&(kt[o]=void 0,Ya.push(o))}var Le=o=>{if(!o)throw new Gt(`Cannot use deleted val. handle = ${o}`);return kt[o]},Ge=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let d=Ya.pop()||kt.length;return kt[d]=o,kt[d+1]=1,d}};function pi(o){return this.Oc((x(),q)[o>>>2>>>0])}var pm={name:"emscripten::val",Oc:o=>{var d=Le(o);return di(o),d},Vc:(o,d)=>Ge(d),Uc:pi,Wc:null};function cm(o){return it(o>>>0,pm)}var hm=(o,d)=>{switch(d){case 4:return function(y){return this.Oc((x(),ee)[y>>>2>>>0])};case 8:return function(y){return this.Oc((x(),te)[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${d}): ${o}`)}};function fm(o,d,y){y>>>=0,it(o>>>=0,{name:d=Ye(d>>>0),Oc:m=>m,Vc:(m,S)=>S,Uc:hm(d,y),Wc:null})}function mm(o,d,y,m,S){o>>>=0,y>>>=0,d=Ye(d>>>0);let z=N=>N;if(m===0){var M=32-8*y;z=N=>N<<M>>>M,S=z(S)}it(o,{name:d,Oc:z,Vc:(N,G)=>G,Uc:Qa(d,y,m!==0),Wc:null})}function gm(o,d,y){function m(z){var M=(x(),q)[z>>>2>>>0];return z=(x(),q)[z+4>>>2>>>0],new S((x(),H).buffer,z,M)}var S=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][d];it(o>>>=0,{name:y=Ye(y>>>0),Oc:m,Uc:m},{yd:!0})}var ht=(o,d,y)=>{var m=(x(),W);if(d>>>=0,0<y){var S=d;y=d+y-1;for(var z=0;z<o.length;++z){var M=o.codePointAt(z);if(127>=M){if(d>=y)break;m[d++>>>0]=M}else if(2047>=M){if(d+1>=y)break;m[d++>>>0]=192|M>>6,m[d++>>>0]=128|63&M}else if(65535>=M){if(d+2>=y)break;m[d++>>>0]=224|M>>12,m[d++>>>0]=128|M>>6&63,m[d++>>>0]=128|63&M}else{if(d+3>=y)break;m[d++>>>0]=240|M>>18,m[d++>>>0]=128|M>>12&63,m[d++>>>0]=128|M>>6&63,m[d++>>>0]=128|63&M,z++}}m[d>>>0]=0,o=d-S}else o=0;return o},$r=o=>{for(var d=0,y=0;y<o.length;++y){var m=o.charCodeAt(y);127>=m?d++:2047>=m?d+=2:55296<=m&&57343>=m?(d+=4,++y):d+=3}return d};function ym(o,d){it(o>>>=0,{name:d=Ye(d>>>0),Oc(y){var m=(x(),q)[y>>>2>>>0];return m=ze(y+4,m,!0),et(y),m},Vc(y,m){m instanceof ArrayBuffer&&(m=new Uint8Array(m));var S=typeof m=="string";if(!(S||ArrayBuffer.isView(m)&&m.BYTES_PER_ELEMENT==1))throw new Gt("Cannot pass non-string to std::string");var z=S?$r(m):m.length,M=Jt(4+z+1),N=M+4;return(x(),q)[M>>>2>>>0]=z,S?ht(m,N,z+1):(x(),W).set(m,N>>>0),y!==null&&y.push(et,M),M},Uc:pi,Wc(y){et(y)}})}var Ja=globalThis.TextDecoder?new TextDecoder("utf-16le"):void 0,_m=(o,d,y)=>{if(o>>>=1,16<(d=Da((x(),re),o,d/2,y))-o&&Ja)return Ja.decode((x(),re).slice(o,d));for(y="";o<d;++o){var m=(x(),re)[o>>>0];y+=String.fromCharCode(m)}return y},bm=(o,d,y)=>{if(y??=2147483647,2>y)return 0;var m=d;y=(y-=2)<2*o.length?y/2:o.length;for(var S=0;S<y;++S){var z=o.charCodeAt(S);(x(),F)[d>>>1>>>0]=z,d+=2}return(x(),F)[d>>>1>>>0]=0,d-m},wm=o=>2*o.length,$m=(o,d,y)=>{var m="";o>>>=2;for(var S=0;!(S>=d/4);S++){var z=(x(),q)[o+S>>>0];if(!z&&!y)break;m+=String.fromCodePoint(z)}return m},vm=(o,d,y)=>{if(d>>>=0,y??=2147483647,4>y)return 0;var m=d;y=m+y-4;for(var S=0;S<o.length;++S){var z=o.codePointAt(S);if(65535<z&&S++,(x(),O)[d>>>2>>>0]=z,(d+=4)+4>y)break}return(x(),O)[d>>>2>>>0]=0,d-m},xm=o=>{for(var d=0,y=0;y<o.length;++y)65535<o.codePointAt(y)&&y++,d+=4;return d};function Sm(o,d,y){if(o>>>=0,d>>>=0,y=Ye(y>>>=0),d===2)var m=_m,S=bm,z=wm;else m=$m,S=vm,z=xm;it(o,{name:y,Oc:M=>{var N=(x(),q)[M>>>2>>>0];return N=m(M+4,N*d,!0),et(M),N},Vc:(M,N)=>{if(typeof N!="string")throw new Gt(`Cannot pass non-string to C++ string type ${y}`);var G=z(N),j=Jt(4+G+d);return(x(),q)[j>>>2>>>0]=G/d,S(N,j+4,G+d),M!==null&&M.push(et,j),j},Uc:pi,Wc(M){et(M)}})}function km(o,d){it(o>>>=0,{zd:!0,name:d=Ye(d>>>0),Oc:()=>{},Vc:()=>{}})}function Tm(o){wi(o>>>0,!i,1,!r,131072,!1),Ea()}var vr=o=>{if(!A)try{if(o(),!(0<dt))try{n?zr()&&$i(_):ai(_)}catch(d){d instanceof Oe||d=="unwind"||p(0,d)}}catch(d){d instanceof Oe||d=="unwind"||p(0,d)}},Im=!Atomics.waitAsync||globalThis.navigator?.userAgent&&91>Number((navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./)||[])[2]);function ci(o){o>>>=0,Im||(Atomics.waitAsync((x(),O),o>>>2,o).value.then(xr),o+=128,Atomics.store((x(),O),o>>>2,1))}var xr=()=>vr(()=>{var o=zr();o&&(ci(o),Ts())});function Em(o,d){(o>>>=0)==d>>>0?setTimeout(xr):n?postMessage({Zc:o,Sc:"checkMailbox"}):(o=St[o])&&o.postMessage({Sc:"checkMailbox"})}var hi=[];function zm(o,d,y,m,S){for(d>>>=0,S>>>=0,hi.length=0,y=S>>>3,m=S+m>>>3;y<m;){var z;z=(x(),Y)[y++>>>0]?(x(),Y)[y++>>>0]:(x(),te)[y++>>>0],hi.push(z)}return(d?ki[d]:wg[o])(...hi)}var Cm=()=>{dt=0};function Am(o){o>>>=0,n?postMessage({Sc:"cleanupThread",Nd:o}):Ia(St[o])}function Om(o){}var Sr=o=>{try{o()}catch(d){_e(d)}};function Rm(o){var d=(...y)=>{kr.push(o);try{return o(...y)}finally{A||(kr.pop(),Je&&ft===1&&kr.length===0&&(ft=0,dt+=1,Sr(mo),typeof Fibers<"u"&&Fibers.be()))}};return rs.set(o,d),d}var ft=0,Je=null,es=0,kr=[],fi=new Map,ts=new Map,rs=new Map,Mm=0,mi=null,Bm=[],is=o=>(function(d){if(!A){if(ft===0){var y=!1,m=!1;d((S=0)=>{if(!A&&(es=S,y=!0,m)){ft=2,Sr(()=>go(Je)),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.resume(),S=!1;try{var z=(function(){var G=(x(),O)[Je+8>>>2>>>0];return G=ts.get(G),G=rs.get(G),--dt,G()})()}catch(G){z=G,S=!0}var M=!1;if(!Je){var N=mi;N&&(mi=null,(S?N.reject:N.resolve)(z),M=!0)}if(S&&!M)throw z}}),m=!0,y||(ft=1,Je=(function(){var S=Jt(65548),z=S+12;if((x(),q)[S>>>2>>>0]=z,(x(),q)[S+4>>>2>>>0]=z+65536,z=kr[0],!fi.has(z)){var M=Mm++;fi.set(z,M),ts.set(M,z)}return z=fi.get(z),(x(),O)[S+8>>>2>>>0]=z,S})(),typeof MainLoop<"u"&&MainLoop.ud&&MainLoop.pause(),Sr(()=>fo(Je)))}else ft===2?(ft=0,Sr(yo),et(Je),Je=null,Bm.forEach(vr)):_e(`invalid state: ${ft}`);return es}})(d=>{o().then(d)});function Dm(o){return o>>>=0,is(async()=>{var d=await Le(o);return Ge(d)})}var gi=[],Nm=o=>{var d=gi.length;return gi.push(o),d},Um=(o,d)=>{for(var y=Array(o),m=0;m<o;++m){var S=m,z=(x(),q)[d+4*m>>>2>>>0],M=li[z];if(M===void 0)throw o=`parameter ${m}`,z=ws(z),d=Ye(z),et(z),new Gt(`${o} has unknown type ${d}`);y[S]=M}return y},Pm=(o,d,y)=>{var m=[];return o=o(m,y),m.length&&((x(),q)[d>>>2>>>0]=Ge(m)),o},qm={},Tr=o=>{var d=qm[o];return d===void 0?Ye(o):d};function Lm(o,d,y){var[m,...S]=Um(o,d>>>0);d=m.Vc.bind(m);var z=S.map(G=>G.Uc.bind(G));o--;var M={toValue:Le};switch(o=z.map((G,j)=>{var ue=`argFromPtr${j}`;return M[ue]=G,`${ue}(args${j?"+"+8*j:""})`}),y){case 0:var N="toValue(handle)";break;case 2:N="new (toValue(handle))";break;case 3:N="";break;case 1:M.getStringOrSymbol=Tr,N="toValue(handle)[getStringOrSymbol(methodName)]"}return N+=`(${o})`,m.zd||(M.toReturnWire=d,M.emval_returnValue=Pm,N=`return emval_returnValue(toReturnWire, destructorsRef, ${N})`),N=`return function (handle, methodName, destructorsRef, args) {
  ${N}
  }`,y=new Function(Object.keys(M),N)(...Object.values(M)),N=`methodCaller<(${S.map(G=>G.name)}) => ${m.name}>`,Nm(Object.defineProperty(y,"name",{value:N}))}function Wm(o,d){return d>>>=0,(o=Le(o>>>0))==Le(d)}function Vm(o){return(o>>>=0)?(o=Tr(o),Ge(globalThis[o])):Ge(globalThis)}function Gm(o){return o=Tr(o>>>0),Ge(t[o])}function Hm(o,d){return d>>>=0,o=Le(o>>>0),d=Le(d),Ge(o[d])}function Fm(o){9<(o>>>=0)&&(kt[o+1]+=1)}function ns(o,d,y,m,S){return gi[o>>>0](d>>>0,y>>>0,m>>>0,S>>>0)}function jm(o,d,y,m,S){return ns(o>>>0,d>>>0,y>>>0,m>>>0,S>>>0)}function Km(){return Ge([])}function Zm(o){o=Le(o>>>0);for(var d=Array(o.length),y=0;y<o.length;y++)d[y]=o[y];return Ge(d)}function Xm(o){return Ge(Tr(o>>>0))}function Qm(){return Ge({})}function Ym(o){for(var d=Le(o>>>=0);d.length;){var y=d.pop();d.pop()(y)}di(o)}function Jm(o,d,y){d>>>=0,y>>>=0,o=Le(o>>>0),d=Le(d),y=Le(y),o[d]=y}function eg(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(x(),O)[d>>>2>>>0]=o.getUTCSeconds(),(x(),O)[d+4>>>2>>>0]=o.getUTCMinutes(),(x(),O)[d+8>>>2>>>0]=o.getUTCHours(),(x(),O)[d+12>>>2>>>0]=o.getUTCDate(),(x(),O)[d+16>>>2>>>0]=o.getUTCMonth(),(x(),O)[d+20>>>2>>>0]=o.getUTCFullYear()-1900,(x(),O)[d+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,(x(),O)[d+28>>>2>>>0]=o}var as=o=>o%4==0&&(o%100!=0||o%400==0),ss=[0,31,60,91,121,152,182,213,244,274,305,335],os=[0,31,59,90,120,151,181,212,243,273,304,334];function tg(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),(x(),O)[d>>>2>>>0]=o.getSeconds(),(x(),O)[d+4>>>2>>>0]=o.getMinutes(),(x(),O)[d+8>>>2>>>0]=o.getHours(),(x(),O)[d+12>>>2>>>0]=o.getDate(),(x(),O)[d+16>>>2>>>0]=o.getMonth(),(x(),O)[d+20>>>2>>>0]=o.getFullYear()-1900,(x(),O)[d+24>>>2>>>0]=o.getDay();var y=(as(o.getFullYear())?ss:os)[o.getMonth()]+o.getDate()-1|0;(x(),O)[d+28>>>2>>>0]=y,(x(),O)[d+36>>>2>>>0]=-60*o.getTimezoneOffset(),y=new Date(o.getFullYear(),6,1).getTimezoneOffset();var m=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(y!=m&&o.getTimezoneOffset()==Math.min(m,y)),(x(),O)[d+32>>>2>>>0]=o}function rg(o){o>>>=0;var d=new Date((x(),O)[o+20>>>2>>>0]+1900,(x(),O)[o+16>>>2>>>0],(x(),O)[o+12>>>2>>>0],(x(),O)[o+8>>>2>>>0],(x(),O)[o+4>>>2>>>0],(x(),O)[o>>>2>>>0],0),y=(x(),O)[o+32>>>2>>>0],m=d.getTimezoneOffset(),S=new Date(d.getFullYear(),6,1).getTimezoneOffset(),z=new Date(d.getFullYear(),0,1).getTimezoneOffset(),M=Math.min(z,S);return 0>y?(x(),O)[o+32>>>2>>>0]=+(S!=z&&M==m):0<y!=(M==m)&&(S=Math.max(z,S),d.setTime(d.getTime()+6e4*((0<y?M:S)-m))),(x(),O)[o+24>>>2>>>0]=d.getDay(),y=(as(d.getFullYear())?ss:os)[d.getMonth()]+d.getDate()-1|0,(x(),O)[o+28>>>2>>>0]=y,(x(),O)[o>>>2>>>0]=d.getSeconds(),(x(),O)[o+4>>>2>>>0]=d.getMinutes(),(x(),O)[o+8>>>2>>>0]=d.getHours(),(x(),O)[o+12>>>2>>>0]=d.getDate(),(x(),O)[o+16>>>2>>>0]=d.getMonth(),(x(),O)[o+20>>>2>>>0]=d.getYear(),o=d.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function us(o,d,y,m,S,z,M){return n?Se(16,1,o,d,y,m,S,z,M):-52}function ls(o,d,y,m,S,z){if(n)return Se(17,1,o,d,y,m,S,z)}var Yt={},ig=()=>performance.timeOrigin+performance.now();function ds(o,d){if(n)return Se(18,1,o,d);if(Yt[o]&&(clearTimeout(Yt[o].id),delete Yt[o]),!d)return 0;var y=setTimeout(()=>{delete Yt[o],vr(()=>ks(o,performance.timeOrigin+performance.now()))},d);return Yt[o]={id:y,ae:d},0}function ng(o,d,y,m){o>>>=0,d>>>=0,y>>>=0,m>>>=0;var S=new Date().getFullYear(),z=new Date(S,0,1).getTimezoneOffset();S=new Date(S,6,1).getTimezoneOffset();var M=Math.max(z,S);(x(),q)[o>>>2>>>0]=60*M,(x(),O)[d>>>2>>>0]=+(z!=S),o=(d=N=>{var G=Math.abs(N);return`UTC${0<=N?"-":"+"}${String(Math.floor(G/60)).padStart(2,"0")}${String(G%60).padStart(2,"0")}`})(z),d=d(S),S<z?(ht(o,y,17),ht(d,m,17)):(ht(o,m,17),ht(d,y,17))}var ag=()=>Date.now(),sg=1;function og(o,d,y){if(y>>>=0,!(0<=o&&3>=o))return 28;if(o===0)o=Date.now();else{if(!sg)return 52;o=performance.timeOrigin+performance.now()}return o=Math.round(1e6*o),(x(),Y)[y>>>3>>>0]=BigInt(o),0}var yi=[],ps=(o,d)=>{yi.length=0;for(var y;y=(x(),W)[o++>>>0];){var m=y!=105;d+=(m&=y!=112)&&d%8?4:0,yi.push(y==112?(x(),q)[d>>>2>>>0]:y==106?(x(),Y)[d>>>3>>>0]:y==105?(x(),O)[d>>>2>>>0]:(x(),te)[d>>>3>>>0]),d+=m?8:4}return yi};function ug(o,d,y){return o>>>=0,d=ps(d>>>0,y>>>0),ki[o](...d)}function lg(o,d,y){return o>>>=0,d=ps(d>>>0,y>>>0),ki[o](...d)}var dg=()=>{};function pg(o,d){return C(ze(o>>>0,d>>>0))}var cg=()=>{throw dt+=1,"unwind"};function hg(){return 4294901760}var fg=()=>navigator.hardwareConcurrency,Tt={},Ir=o=>{var d;return(d=/\bwasm-function\[\d+\]:(0x[0-9a-f]+)/.exec(o))?+d[1]:(d=/:(\d+):\d+(?:\)|$)/.exec(o))?2147483648|+d[1]:0},cs=o=>{for(var d of o)(o=Ir(d))&&(Tt[o]=d)};function mg(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),cs(o),Tt.gd=Ir(o[3]),Tt.Jd=o,Tt.gd}function Er(o){if(!(o=Tt[o>>>0]))return 0;var d;if(d=/^\s+at .*\.wasm\.(.*) \(.*\)$/.exec(o))o=d[1];else if(d=/^\s+at (.*) \(.*\)$/.exec(o))o=d[1];else{if(!(d=/^(.+?)@/.exec(o)))return 0;o=d[1]}et(Er.hd??0),d=$r(o)+1;var y=Jt(d);return y&&ht(o,y,d),Er.hd=y,Er.hd}function gg(o){o>>>=0;var d=(x(),W).length;if(o<=d||4294901760<o)return!1;for(var y=1;4>=y;y*=2){var m=d*(1+.2/y);m=Math.min(m,o+100663296);e:{m=(Math.min(4294901760,65536*Math.ceil(Math.max(o,m)/65536))-ct.buffer.byteLength+65535)/65536|0;try{ct.grow(m),K();var S=1;break e}catch{}S=void 0}if(S)return!0}return!1}function yg(o,d,y){if(o>>>=0,d>>>=0,Tt.gd==o)var m=Tt.Jd;else(m=Error().stack.toString().split(`
`))[0]=="Error"&&m.shift(),cs(m);for(var S=3;m[S]&&Ir(m[S])!=o;)++S;for(o=0;o<y&&m[o+S];++o)(x(),O)[d+4*o>>>2>>>0]=Ir(m[o+S]);return o}var _i,bi={},hs=()=>{if(!_i){var o,d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(globalThis.navigator?.language??"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in bi)bi[o]===void 0?delete d[o]:d[o]=bi[o];var y=[];for(o in d)y.push(`${o}=${d[o]}`);_i=y}return _i};function fs(o,d){if(n)return Se(19,1,o,d);o>>>=0,d>>>=0;var y,m=0,S=0;for(y of hs()){var z=d+m;(x(),q)[o+S>>>2>>>0]=z,m+=ht(y,z,1/0)+1,S+=4}return 0}function ms(o,d){if(n)return Se(20,1,o,d);o>>>=0,d>>>=0;var y=hs();for(var m of((x(),q)[o>>>2>>>0]=y.length,o=0,y))o+=$r(m)+1;return(x(),q)[d>>>2>>>0]=o,0}function gs(o){return n?Se(21,1,o):52}function ys(o,d,y,m){return n?Se(22,1,o,d,y,m):52}function _s(o,d,y,m){return n?Se(23,1,o,d,y,m):70}var _g=[null,[],[]];function bs(o,d,y,m){if(n)return Se(24,1,o,d,y,m);d>>>=0,y>>>=0,m>>>=0;for(var S=0,z=0;z<y;z++){var M=(x(),q)[d>>>2>>>0],N=(x(),q)[d+4>>>2>>>0];d+=8;for(var G=0;G<N;G++){var j=o,ue=(x(),W)[M+G>>>0],he=_g[j];ue===0||ue===10?((j===1?I:C)(Na(he)),he.length=0):he.push(ue)}S+=N}return(x(),q)[m>>>2>>>0]=S,0}function bg(o){return o>>>0}n||(function(){for(var o=t.numThreads-1;o--;)Ca();ke.push(async()=>{var d=(async function(){if(!n)return Promise.all(pt.map(za))})();De++,await d,--De==0&&xt&&(d=xt,xt=null,d())})})(),n||(ct=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),K()),t.wasmBinary&&(g=t.wasmBinary),t.stackSave=()=>de(),t.stackRestore=o=>le(o),t.stackAlloc=o=>vi(o),t.setValue=function(o,d,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":(x(),H)[o>>>0]=d;break;case"i16":(x(),F)[o>>>1>>>0]=d;break;case"i32":(x(),O)[o>>>2>>>0]=d;break;case"i64":(x(),Y)[o>>>3>>>0]=BigInt(d);break;case"float":(x(),ee)[o>>>2>>>0]=d;break;case"double":(x(),te)[o>>>3>>>0]=d;break;case"*":(x(),q)[o>>>2>>>0]=d;break;default:_e(`invalid type for setValue: ${y}`)}},t.getValue=function(o,d="i8"){switch(d.endsWith("*")&&(d="*"),d){case"i1":case"i8":return(x(),H)[o>>>0];case"i16":return(x(),F)[o>>>1>>>0];case"i32":return(x(),O)[o>>>2>>>0];case"i64":return(x(),Y)[o>>>3>>>0];case"float":return(x(),ee)[o>>>2>>>0];case"double":return(x(),te)[o>>>3>>>0];case"*":return(x(),q)[o>>>2>>>0];default:_e(`invalid type for getValue: ${d}`)}},t.UTF8ToString=ze,t.stringToUTF8=ht,t.lengthBytesUTF8=$r;var ws,$s,zr,et,Jt,wi,vs,xs,Ss,$i,ks,Ts,pe,er,Is,le,vi,de,Es,xi,zs,Cs,As,Si,Os,Rs,Ms,Bs,Ds,Ns,Us,Ps,qs,Ls,Ws,Vs,Gs,Hs,Fs,js,Ks,Zs,Xs,Qs,Ys,Js,eo,to,ro,io,no,ao,so,oo,uo,lo,po,co,ho,fo,mo,go,yo,nt,wg=[ni,ka,Ra,Ua,Pa,qa,La,Wa,Va,Ga,Ha,Fa,ja,Ka,Za,Xa,us,ls,ds,fs,ms,gs,ys,_s,bs],ki={1055492:(o,d,y,m,S)=>{if(t===void 0||!t.Yc)return 1;if((o=ze(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=t.Yc.get(o)))return 2;if(d=Number(d>>>0),y=Number(y>>>0),m=Number(m>>>0),d+y>o.byteLength)return 3;try{let z=o.subarray(d,d+y);switch(S){case 0:(x(),W).set(z,m>>>0);break;case 1:t.Qd?t.Qd(m,z):t.Id(m,z);break;default:return 4}return 0}catch{return 4}},1056316:(o,d,y)=>{t.td(o,(x(),W).subarray(d>>>0,d+y>>>0))},1056380:()=>t.Sd(),1056422:o=>{t.sd(o)},1056459:()=>{t.Bd()},1056490:()=>{t.Cd()},1056519:()=>{t.Gd()},1056544:o=>t.Ad(o),1056577:o=>t.Ed(o),1056609:(o,d,y)=>{t.ed(Number(o),Number(d),Number(y),!0)},1056672:(o,d,y)=>{t.ed(Number(o),Number(d),Number(y))},1056729:()=>typeof wasmOffsetConverter<"u",1056786:o=>{t.$b("Abs",o,void 0)},1056837:o=>{t.$b("Neg",o,void 0)},1056888:o=>{t.$b("Floor",o,void 0)},1056941:o=>{t.$b("Ceil",o,void 0)},1056993:o=>{t.$b("Reciprocal",o,void 0)},1057051:o=>{t.$b("Sqrt",o,void 0)},1057103:o=>{t.$b("Exp",o,void 0)},1057154:o=>{t.$b("Erf",o,void 0)},1057205:o=>{t.$b("Sigmoid",o,void 0)},1057260:(o,d,y)=>{t.$b("HardSigmoid",o,{alpha:d,beta:y})},1057339:o=>{t.$b("HardSwish",o,void 0)},1057396:o=>{t.$b("Log",o,void 0)},1057447:o=>{t.$b("Sin",o,void 0)},1057498:o=>{t.$b("Cos",o,void 0)},1057549:o=>{t.$b("Tan",o,void 0)},1057600:o=>{t.$b("Asin",o,void 0)},1057652:o=>{t.$b("Acos",o,void 0)},1057704:o=>{t.$b("Atan",o,void 0)},1057756:o=>{t.$b("Sinh",o,void 0)},1057808:o=>{t.$b("Cosh",o,void 0)},1057860:o=>{t.$b("Asinh",o,void 0)},1057913:o=>{t.$b("Acosh",o,void 0)},1057966:o=>{t.$b("Atanh",o,void 0)},1058019:o=>{t.$b("Tanh",o,void 0)},1058071:o=>{t.$b("Not",o,void 0)},1058122:(o,d,y)=>{t.$b("Clip",o,{min:d,max:y})},1058191:o=>{t.$b("Clip",o,void 0)},1058243:(o,d)=>{t.$b("Elu",o,{alpha:d})},1058301:o=>{t.$b("Gelu",o,void 0)},1058353:o=>{t.$b("Relu",o,void 0)},1058405:(o,d)=>{t.$b("LeakyRelu",o,{alpha:d})},1058469:(o,d)=>{t.$b("ThresholdedRelu",o,{alpha:d})},1058539:(o,d)=>{t.$b("Cast",o,{to:d})},1058597:o=>{t.$b("Add",o,void 0)},1058648:o=>{t.$b("Sub",o,void 0)},1058699:o=>{t.$b("Mul",o,void 0)},1058750:o=>{t.$b("Div",o,void 0)},1058801:o=>{t.$b("Pow",o,void 0)},1058852:o=>{t.$b("Equal",o,void 0)},1058905:o=>{t.$b("Greater",o,void 0)},1058960:o=>{t.$b("GreaterOrEqual",o,void 0)},1059022:o=>{t.$b("Less",o,void 0)},1059074:o=>{t.$b("LessOrEqual",o,void 0)},1059133:(o,d,y,m,S)=>{t.$b("ReduceMean",o,{keepDims:!!d,noopWithEmptyAxes:!!y,axes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1059308:(o,d,y,m,S)=>{t.$b("ReduceMax",o,{keepDims:!!d,noopWithEmptyAxes:!!y,axes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1059482:(o,d,y,m,S)=>{t.$b("ReduceMin",o,{keepDims:!!d,noopWithEmptyAxes:!!y,axes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1059656:(o,d,y,m,S)=>{t.$b("ReduceProd",o,{keepDims:!!d,noopWithEmptyAxes:!!y,axes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1059831:(o,d,y,m,S)=>{t.$b("ReduceSum",o,{keepDims:!!d,noopWithEmptyAxes:!!y,axes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1060005:(o,d,y,m,S)=>{t.$b("ReduceL1",o,{keepDims:!!d,noopWithEmptyAxes:!!y,axes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1060178:(o,d,y,m,S)=>{t.$b("ReduceL2",o,{keepDims:!!d,noopWithEmptyAxes:!!y,axes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1060351:(o,d,y,m,S)=>{t.$b("ReduceLogSum",o,{keepDims:!!d,noopWithEmptyAxes:!!y,axes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1060528:(o,d,y,m,S)=>{t.$b("ReduceSumSquare",o,{keepDims:!!d,noopWithEmptyAxes:!!y,axes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1060708:(o,d,y,m,S)=>{t.$b("ReduceLogSumExp",o,{keepDims:!!d,noopWithEmptyAxes:!!y,axes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1060888:o=>{t.$b("Where",o,void 0)},1060941:(o,d,y)=>{t.$b("Transpose",o,{perm:d?Array.from((x(),O).subarray(Number(d)>>>0,Number(y)>>>0)):[]})},1061065:(o,d,y,m)=>{t.$b("DepthToSpace",o,{blocksize:d,mode:ze(y),format:m?"NHWC":"NCHW"})},1061198:(o,d,y,m)=>{t.$b("DepthToSpace",o,{blocksize:d,mode:ze(y),format:m?"NHWC":"NCHW"})},1061331:(o,d,y,m)=>{t.$b("DFT",o,{axis:d,inverse:y,onesided:m})},1061423:(o,d,y,m,S,z,M,N,G,j,ue,he,we,xe,mt)=>{t.$b("ConvTranspose",o,{format:G?"NHWC":"NCHW",autoPad:d,dilations:[y],group:m,kernelShape:[S],pads:[z,M],strides:[N],wIsConst:()=>!!(x(),H)[j>>>0],outputPadding:ue?Array.from((x(),O).subarray(Number(ue)>>>0,Number(he)>>>0)):[],outputShape:we?Array.from((x(),O).subarray(Number(we)>>>0,Number(xe)>>>0)):[],activation:ze(mt)})},1061856:(o,d,y,m,S,z,M,N,G,j,ue,he,we,xe)=>{t.$b("ConvTranspose",o,{format:N?"NHWC":"NCHW",autoPad:d,dilations:Array.from((x(),O).subarray(Number(y)>>>0,(Number(y)>>>0)+2>>>0)),group:m,kernelShape:Array.from((x(),O).subarray(Number(S)>>>0,(Number(S)>>>0)+2>>>0)),pads:Array.from((x(),O).subarray(Number(z)>>>0,(Number(z)>>>0)+4>>>0)),strides:Array.from((x(),O).subarray(Number(M)>>>0,(Number(M)>>>0)+2>>>0)),wIsConst:()=>!!(x(),H)[G>>>0],outputPadding:j?Array.from((x(),O).subarray(Number(j)>>>0,Number(ue)>>>0)):[],outputShape:he?Array.from((x(),O).subarray(Number(he)>>>0,Number(we)>>>0)):[],activation:ze(xe)})},1062517:(o,d,y,m,S,z,M,N,G,j,ue,he,we,xe,mt)=>{t.$b("ConvTranspose",o,{format:G?"NHWC":"NCHW",autoPad:d,dilations:[y],group:m,kernelShape:[S],pads:[z,M],strides:[N],wIsConst:()=>!!(x(),H)[j>>>0],outputPadding:ue?Array.from((x(),O).subarray(Number(ue)>>>0,Number(he)>>>0)):[],outputShape:we?Array.from((x(),O).subarray(Number(we)>>>0,Number(xe)>>>0)):[],activation:ze(mt)})},1062950:(o,d,y,m,S,z,M,N,G,j,ue,he,we,xe)=>{t.$b("ConvTranspose",o,{format:N?"NHWC":"NCHW",autoPad:d,dilations:Array.from((x(),O).subarray(Number(y)>>>0,(Number(y)>>>0)+2>>>0)),group:m,kernelShape:Array.from((x(),O).subarray(Number(S)>>>0,(Number(S)>>>0)+2>>>0)),pads:Array.from((x(),O).subarray(Number(z)>>>0,(Number(z)>>>0)+4>>>0)),strides:Array.from((x(),O).subarray(Number(M)>>>0,(Number(M)>>>0)+2>>>0)),wIsConst:()=>!!(x(),H)[G>>>0],outputPadding:j?Array.from((x(),O).subarray(Number(j)>>>0,Number(ue)>>>0)):[],outputShape:he?Array.from((x(),O).subarray(Number(he)>>>0,Number(we)>>>0)):[],activation:ze(xe)})},1063611:(o,d)=>{t.$b("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},1063702:(o,d,y,m,S,z,M,N,G,j,ue,he,we,xe)=>{t.$b("AveragePool",o,{format:xe?"NHWC":"NCHW",auto_pad:d,ceil_mode:y,count_include_pad:m,storage_order:S,dilations:z?Array.from((x(),O).subarray(Number(z)>>>0,Number(M)>>>0)):[],kernel_shape:N?Array.from((x(),O).subarray(Number(N)>>>0,Number(G)>>>0)):[],pads:j?Array.from((x(),O).subarray(Number(j)>>>0,Number(ue)>>>0)):[],strides:he?Array.from((x(),O).subarray(Number(he)>>>0,Number(we)>>>0)):[]})},1064181:(o,d)=>{t.$b("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},1064272:(o,d,y,m,S,z,M,N,G,j,ue,he,we,xe)=>{t.$b("AveragePool",o,{format:xe?"NHWC":"NCHW",auto_pad:d,ceil_mode:y,count_include_pad:m,storage_order:S,dilations:z?Array.from((x(),O).subarray(Number(z)>>>0,Number(M)>>>0)):[],kernel_shape:N?Array.from((x(),O).subarray(Number(N)>>>0,Number(G)>>>0)):[],pads:j?Array.from((x(),O).subarray(Number(j)>>>0,Number(ue)>>>0)):[],strides:he?Array.from((x(),O).subarray(Number(he)>>>0,Number(we)>>>0)):[]})},1064751:(o,d)=>{t.$b("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},1064838:(o,d,y,m,S,z,M,N,G,j,ue,he,we,xe)=>{t.$b("MaxPool",o,{format:xe?"NHWC":"NCHW",auto_pad:d,ceil_mode:y,count_include_pad:m,storage_order:S,dilations:z?Array.from((x(),O).subarray(Number(z)>>>0,Number(M)>>>0)):[],kernel_shape:N?Array.from((x(),O).subarray(Number(N)>>>0,Number(G)>>>0)):[],pads:j?Array.from((x(),O).subarray(Number(j)>>>0,Number(ue)>>>0)):[],strides:he?Array.from((x(),O).subarray(Number(he)>>>0,Number(we)>>>0)):[]})},1065313:(o,d)=>{t.$b("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},1065400:(o,d,y,m,S,z,M,N,G,j,ue,he,we,xe)=>{t.$b("MaxPool",o,{format:xe?"NHWC":"NCHW",auto_pad:d,ceil_mode:y,count_include_pad:m,storage_order:S,dilations:z?Array.from((x(),O).subarray(Number(z)>>>0,Number(M)>>>0)):[],kernel_shape:N?Array.from((x(),O).subarray(Number(N)>>>0,Number(G)>>>0)):[],pads:j?Array.from((x(),O).subarray(Number(j)>>>0,Number(ue)>>>0)):[],strides:he?Array.from((x(),O).subarray(Number(he)>>>0,Number(we)>>>0)):[]})},1065875:(o,d,y,m,S)=>{t.$b("Gemm",o,{alpha:d,beta:y,transA:m,transB:S})},1065979:o=>{t.$b("MatMul",o,void 0)},1066033:(o,d,y,m)=>{t.$b("ArgMax",o,{keepDims:!!d,selectLastIndex:!!y,axis:m})},1066141:(o,d,y,m)=>{t.$b("ArgMin",o,{keepDims:!!d,selectLastIndex:!!y,axis:m})},1066249:(o,d)=>{t.$b("Softmax",o,{axis:d})},1066312:(o,d)=>{t.$b("Concat",o,{axis:d})},1066372:(o,d,y,m,S)=>{t.$b("Split",o,{axis:d,numOutputs:y,splitSizes:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1066528:o=>{t.$b("Expand",o,void 0)},1066582:(o,d)=>{t.$b("Gather",o,{axis:Number(d)})},1066653:(o,d)=>{t.$b("GatherElements",o,{axis:Number(d)})},1066732:(o,d)=>{t.$b("GatherND",o,{batch_dims:Number(d)})},1066811:(o,d,y,m,S,z,M,N,G,j,ue)=>{t.$b("Resize",o,{antialias:d,axes:y?Array.from((x(),O).subarray(Number(y)>>>0,Number(m)>>>0)):[],coordinateTransformMode:ze(S),cubicCoeffA:z,excludeOutside:M,extrapolationValue:N,keepAspectRatioPolicy:ze(G),mode:ze(j),nearestMode:ze(ue)})},1067173:(o,d,y,m,S,z,M)=>{t.$b("Slice",o,{starts:d?Array.from((x(),O).subarray(Number(d)>>>0,Number(y)>>>0)):[],ends:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[],axes:z?Array.from((x(),O).subarray(Number(z)>>>0,Number(M)>>>0)):[]})},1067437:o=>{t.$b("Tile",o,void 0)},1067489:(o,d,y)=>{t.$b("InstanceNormalization",o,{epsilon:d,format:y?"NHWC":"NCHW"})},1067603:(o,d,y)=>{t.$b("InstanceNormalization",o,{epsilon:d,format:y?"NHWC":"NCHW"})},1067717:o=>{t.$b("Range",o,void 0)},1067770:(o,d)=>{t.$b("Einsum",o,{equation:ze(d)})},1067851:(o,d,y,m,S)=>{t.$b("Pad",o,{mode:d,value:y,pads:m?Array.from((x(),O).subarray(Number(m)>>>0,Number(S)>>>0)):[]})},1067994:(o,d,y,m,S,z)=>{t.$b("BatchNormalization",o,{epsilon:d,momentum:y,spatial:!!S,trainingMode:!!m,format:z?"NHWC":"NCHW"})},1068163:(o,d,y,m,S,z)=>{t.$b("BatchNormalization",o,{epsilon:d,momentum:y,spatial:!!S,trainingMode:!!m,format:z?"NHWC":"NCHW"})},1068332:(o,d,y)=>{t.$b("CumSum",o,{exclusive:Number(d),reverse:Number(y)})},1068429:(o,d,y)=>{t.$b("DequantizeLinear",o,{axis:d,blockSize:y})},1068519:(o,d,y,m,S)=>{t.$b("GridSample",o,{align_corners:d,mode:ze(y),padding_mode:ze(m),format:S?"NHWC":"NCHW"})},1068689:(o,d,y,m,S)=>{t.$b("GridSample",o,{align_corners:d,mode:ze(y),padding_mode:ze(m),format:S?"NHWC":"NCHW"})},1068859:(o,d)=>{t.$b("ScatterND",o,{reduction:ze(d)})},1068944:(o,d,y,m,S,z,M,N,G)=>{t.$b("Attention",o,{numHeads:d,isUnidirectional:y,maskFilterValue:m,scale:S,doRotary:z,qkvHiddenSizes:M?Array.from((x(),O).subarray(Number(N)>>>0,Number(N)+M>>>0)):[],pastPresentShareBuffer:!!G})},1069216:o=>{t.$b("BiasAdd",o,void 0)},1069271:o=>{t.$b("BiasSplitGelu",o,void 0)},1069332:o=>{t.$b("FastGelu",o,void 0)},1069388:(o,d,y,m,S,z,M,N,G,j,ue,he,we,xe,mt,Ti)=>{t.$b("Conv",o,{format:he?"NHWC":"NCHW",auto_pad:d,dilations:y?Array.from((x(),O).subarray(Number(y)>>>0,Number(m)>>>0)):[],group:S,kernel_shape:z?Array.from((x(),O).subarray(Number(z)>>>0,Number(M)>>>0)):[],pads:N?Array.from((x(),O).subarray(Number(N)>>>0,Number(G)>>>0)):[],strides:j?Array.from((x(),O).subarray(Number(j)>>>0,Number(ue)>>>0)):[],w_is_const:()=>!!(x(),H)[Number(we)>>>0],activation:ze(xe),activation_params:mt?Array.from((x(),ee).subarray(Number(mt)>>>0,Number(Ti)>>>0)):[]})},1069972:o=>{t.$b("Gelu",o,void 0)},1070024:(o,d,y,m,S,z,M,N,G)=>{t.$b("GroupQueryAttention",o,{numHeads:d,kvNumHeads:y,scale:m,softcap:S,doRotary:z,rotaryInterleaved:M,smoothSoftmax:N,localWindowSize:G})},1070241:(o,d,y,m)=>{t.$b("LayerNormalization",o,{axis:d,epsilon:y,simplified:!!m})},1070352:(o,d,y,m)=>{t.$b("LayerNormalization",o,{axis:d,epsilon:y,simplified:!!m})},1070463:(o,d,y,m,S,z)=>{t.$b("MatMulNBits",o,{k:d,n:y,accuracyLevel:m,bits:S,blockSize:z})},1070590:(o,d,y,m,S,z)=>{t.$b("MultiHeadAttention",o,{numHeads:d,isUnidirectional:y,maskFilterValue:m,scale:S,doRotary:z})},1070749:(o,d)=>{t.$b("QuickGelu",o,{alpha:d})},1070813:(o,d,y,m,S)=>{t.$b("RotaryEmbedding",o,{interleaved:!!d,numHeads:y,rotaryEmbeddingDim:m,scale:S})},1070952:(o,d,y)=>{t.$b("SkipLayerNormalization",o,{epsilon:d,simplified:!!y})},1071054:(o,d,y)=>{t.$b("SkipLayerNormalization",o,{epsilon:d,simplified:!!y})},1071156:(o,d,y,m)=>{t.$b("GatherBlockQuantized",o,{gatherAxis:d,quantizeAxis:y,blockSize:m})},1071277:o=>{t.Fd(o)},1071311:(o,d)=>t.Hd(Number(o),Number(d),t.Xc.Kd,t.Xc.errors)};function $g(o,d,y){return is(async()=>{await t.Dd(Number(o),Number(d),Number(y))})}function vg(){return typeof wasmOffsetConverter<"u"}function xg(o,d,y,m){var S=de();try{return Ps(o,d,y,m)}catch(z){if(le(S),z!==z+0)throw z;pe(1,0)}}function Sg(o,d,y){var m=de();try{return Bs(o,d,y)}catch(S){if(le(m),S!==S+0)throw S;pe(1,0)}}function kg(o){var d=de();try{Os(o)}catch(y){if(le(d),y!==y+0)throw y;pe(1,0)}}function Tg(o,d){var y=de();try{return Si(o,d)}catch(m){if(le(y),m!==m+0)throw m;pe(1,0)}}function Ig(o,d,y){var m=de();try{As(o,d,y)}catch(S){if(le(m),S!==S+0)throw S;pe(1,0)}}function Eg(o,d){var y=de();try{qs(o,d)}catch(m){if(le(y),m!==m+0)throw m;pe(1,0)}}function zg(o,d,y,m,S,z,M){var N=de();try{return Ns(o,d,y,m,S,z,M)}catch(G){if(le(N),G!==G+0)throw G;pe(1,0)}}function Cg(o,d,y,m,S,z){var M=de();try{Rs(o,d,y,m,S,z)}catch(N){if(le(M),N!==N+0)throw N;pe(1,0)}}function Ag(o,d,y,m){var S=de();try{Us(o,d,y,m)}catch(z){if(le(S),z!==z+0)throw z;pe(1,0)}}function Og(o,d,y,m,S){var z=de();try{Ms(o,d,y,m,S)}catch(M){if(le(z),M!==M+0)throw M;pe(1,0)}}function Rg(o,d,y,m,S,z,M){var N=de();try{Ws(o,d,y,m,S,z,M)}catch(G){if(le(N),G!==G+0)throw G;pe(1,0)}}function Mg(o,d,y,m,S,z,M){var N=de();try{Vs(o,d,y,m,S,z,M)}catch(G){if(le(N),G!==G+0)throw G;pe(1,0)}}function Bg(o,d,y,m,S,z,M,N){var G=de();try{js(o,d,y,m,S,z,M,N)}catch(j){if(le(G),j!==j+0)throw j;pe(1,0)}}function Dg(o,d,y,m,S){var z=de();try{return Ls(o,d,y,m,S)}catch(M){if(le(z),M!==M+0)throw M;pe(1,0)}}function Ng(o,d,y){var m=de();try{return Ks(o,d,y)}catch(S){if(le(m),S!==S+0)throw S;pe(1,0)}}function Ug(o,d,y,m,S,z,M,N){var G=de();try{Zs(o,d,y,m,S,z,M,N)}catch(j){if(le(G),j!==j+0)throw j;pe(1,0)}}function Pg(o,d,y,m,S,z,M,N,G,j,ue,he){var we=de();try{Gs(o,d,y,m,S,z,M,N,G,j,ue,he)}catch(xe){if(le(we),xe!==xe+0)throw xe;pe(1,0)}}function qg(o,d,y){var m=de();try{return Xs(o,d,y)}catch(S){if(le(m),S!==S+0)throw S;return pe(1,0),0n}}function Lg(o,d,y,m,S,z,M,N,G){var j=de();try{Ds(o,d,y,m,S,z,M,N,G)}catch(ue){if(le(j),ue!==ue+0)throw ue;pe(1,0)}}function Wg(o){var d=de();try{return Qs(o)}catch(y){if(le(d),y!==y+0)throw y;pe(1,0)}}function Vg(o,d){var y=de();try{return ho(o,d)}catch(m){if(le(y),m!==m+0)throw m;return pe(1,0),0n}}function Gg(o){var d=de();try{return Ys(o)}catch(y){if(le(d),y!==y+0)throw y;return pe(1,0),0n}}function Hg(o,d,y,m){var S=de();try{return no(o,d,y,m)}catch(z){if(le(S),z!==z+0)throw z;pe(1,0)}}function Fg(o,d,y,m,S){var z=de();try{return ao(o,d,y,m,S)}catch(M){if(le(z),M!==M+0)throw M;pe(1,0)}}function jg(o,d,y,m,S,z){var M=de();try{return so(o,d,y,m,S,z)}catch(N){if(le(M),N!==N+0)throw N;pe(1,0)}}function Kg(o,d,y,m,S,z){var M=de();try{return Hs(o,d,y,m,S,z)}catch(N){if(le(M),N!==N+0)throw N;pe(1,0)}}function Zg(o,d,y,m,S,z){var M=de();try{return oo(o,d,y,m,S,z)}catch(N){if(le(M),N!==N+0)throw N;pe(1,0)}}function Xg(o,d,y,m,S,z,M,N){var G=de();try{return Fs(o,d,y,m,S,z,M,N)}catch(j){if(le(G),j!==j+0)throw j;pe(1,0)}}function Qg(o,d,y,m,S){var z=de();try{return uo(o,d,y,m,S)}catch(M){if(le(z),M!==M+0)throw M;return pe(1,0),0n}}function Yg(o,d,y,m){var S=de();try{return lo(o,d,y,m)}catch(z){if(le(S),z!==z+0)throw z;pe(1,0)}}function Jg(o,d,y,m){var S=de();try{return po(o,d,y,m)}catch(z){if(le(S),z!==z+0)throw z;pe(1,0)}}function e0(o,d,y,m,S,z,M,N,G,j,ue,he){var we=de();try{return co(o,d,y,m,S,z,M,N,G,j,ue,he)}catch(xe){if(le(we),xe!==xe+0)throw xe;pe(1,0)}}function t0(o,d,y,m,S,z,M,N,G,j,ue){var he=de();try{ro(o,d,y,m,S,z,M,N,G,j,ue)}catch(we){if(le(he),we!==we+0)throw we;pe(1,0)}}function r0(o,d,y,m,S,z,M,N,G,j,ue,he,we,xe,mt,Ti){var s0=de();try{io(o,d,y,m,S,z,M,N,G,j,ue,he,we,xe,mt,Ti)}catch(Ii){if(le(s0),Ii!==Ii+0)throw Ii;pe(1,0)}}function i0(o,d,y){var m=de();try{return Js(o,d,y)}catch(S){if(le(m),S!==S+0)throw S;pe(1,0)}}function n0(o,d,y){var m=de();try{return eo(o,d,y)}catch(S){if(le(m),S!==S+0)throw S;pe(1,0)}}function a0(o,d,y,m){var S=de();try{to(o,d,y,m)}catch(z){if(le(S),z!==z+0)throw z;pe(1,0)}}function Cr(){if(0<De)xt=Cr;else if(n)v?.(t),Z();else{for(var o=ke;0<o.length;)o.shift()(t);0<De?xt=Cr:(t.calledRun=!0,A||(Z(),v?.(t)))}}return n||(nt=await ve(),Cr()),t.PTR_SIZE=4,ie?t:new Promise((o,d)=>{v=o,T=d})}var kp,wo,I0=L(()=>{"use strict";kp=bo,wo=globalThis.self?.name?.startsWith("em-pthread"),wo&&bo()}),Ri,Cn,$o,Ne,Tp,Or,vo,xo,Mi,So,Bi,Ip,Di,Ep,Kn=L(()=>{"use strict";jn(),Ri=typeof location>"u"?void 0:location.origin,Cn=import.meta.url>"file:"&&import.meta.url<"file;",$o=()=>{if(Cn){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Ri).href}return import.meta.url},Ne=$o(),Tp=()=>{if(Ne&&!Ne.startsWith("blob:"))return Ne.substring(0,Ne.lastIndexOf("/")+1)},Or=(e,t)=>{try{let r=t??Ne;return(r?new URL(e,r):new URL(e)).origin===Ri}catch{return!1}},vo=(e,t)=>{let r=t??Ne;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},xo=(e,t)=>`${t??"./"}${e}`,Mi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},So=async e=>(await import(e)).default,Bi=(T0(),gr(vp)).default,Ip=async()=>{if(!Ne)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Or(Ne))return[void 0,Bi()];let e=await Mi(Ne);return[e,Bi(e)]},Di=(I0(),gr(Sp)).default,Ep=async(e,t,r,i)=>{let n=Di&&!(e||t);if(n)if(Ne)n=Or(Ne)||i&&!r;else if(i&&!r)n=!0;else throw new Error("cannot determine the script source URL.");if(n)return[void 0,Di];{let a="ort-wasm-simd-threaded.jsep.mjs",s=e??vo(a,t),u=r&&s&&!Or(s,t),l=u?await Mi(s):s??xo(a,t);return[u?l:void 0,await So(l)]}}}),Ni,Rr,rr,Ui,ko,To,Io,Zn,$e,Lt=L(()=>{"use strict";Kn(),Rr=!1,rr=!1,Ui=!1,ko=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},To=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Io=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Zn=async e=>{if(Rr)return Promise.resolve();if(rr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ui)throw new Error("previous call to 'initializeWebAssembly()' failed.");rr=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Io())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!To())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=ko();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,a=typeof n=="string"?n:void 0,s=n?.mjs,u=s?.href??s,l=n?.wasm,p=l?.href??l,c=e.wasmBinary,[f,g]=await Ep(u,a,r>1,!!c||!!p),b=!1,_=[];if(t>0&&_.push(new Promise(v=>{setTimeout(()=>{b=!0,v()},t)})),_.push(new Promise((v,T)=>{let k={numThreads:r};if(c)k.wasmBinary=c,k.locateFile=$=>$;else if(p||a)k.locateFile=$=>p??a+$;else if(u&&u.indexOf("blob:")!==0)k.locateFile=$=>new URL($,u).href;else if(f){let $=Tp();$&&(k.locateFile=E=>$+E)}g(k).then($=>{rr=!1,Rr=!0,Ni=$,v(),f&&URL.revokeObjectURL(f)},$=>{rr=!1,Ui=!0,T($)})})),await Promise.race(_),b)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},$e=()=>{if(Rr&&Ni)return Ni;throw new Error("WebAssembly is not initialized yet.")}}),Xe,Kr,ge,Xn=L(()=>{"use strict";Lt(),Xe=(e,t)=>{let r=$e(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},Kr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,a])=>{let s=t?t+n:n;if(typeof a=="object")Kr(a,s+".",r,i);else if(typeof a=="string"||typeof a=="number")i(s,a.toString());else if(typeof a=="boolean")i(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},ge=e=>{let t=$e(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let a=Number(t.getValue(n,i===4?"i32":"i64")),s=t.getValue(n+i,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),zp,E0=L(()=>{"use strict";Lt(),Xn(),zp=e=>{let t=$e(),r=0,i=[],n=e||{};try{if(e?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(n.terminate=!1);let a=0;return e?.tag!==void 0&&(a=Xe(e.tag,i)),r=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,a),r===0&&ge("Can't create run options."),e?.extra!==void 0&&Kr(e.extra,"",new WeakSet,(s,u)=>{let l=Xe(s,i),p=Xe(u,i);t._OrtAddRunConfigEntry(r,l,p)!==0&&ge(`Can't set a run config entry: ${s} - ${u}.`)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),a}}}),Eo,zo,Co,Et,Ao,Cp,z0=L(()=>{"use strict";Lt(),Xn(),Eo=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},zo=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Co=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Et=(e,t,r,i)=>{let n=Xe(t,i),a=Xe(r,i);$e()._OrtAddSessionConfigEntry(e,n,a)!==0&&ge(`Can't set a session config entry: ${t} - ${r}.`)},Ao=async(e,t,r)=>{let i=t.executionProviders;for(let n of i){let a=typeof n=="string"?n:n.name,s=[];switch(a){case"webnn":if(a="WEBNN",Et(e,"session.disable_quant_qdq","1",r),Et(e,"session.disable_qdq_constant_folding","1",r),typeof n!="string"){let f=n?.deviceType;f&&Et(e,"deviceType",f,r)}break;case"webgpu":if(a="JS",typeof n!="string"){let f=n;if(f?.preferredLayout){if(f.preferredLayout!=="NCHW"&&f.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${f.preferredLayout}`);Et(e,"preferredLayout",f.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let u=Xe(a,r),l=s.length,p=0,c=0;if(l>0){p=$e()._malloc(l*$e().PTR_SIZE),r.push(p),c=$e()._malloc(l*$e().PTR_SIZE),r.push(c);for(let f=0;f<l;f++)$e().setValue(p+f*$e().PTR_SIZE,s[f][0],"*"),$e().setValue(c+f*$e().PTR_SIZE,s[f][1],"*")}await $e()._OrtAppendExecutionProvider(e,u,p,c,l)!==0&&ge(`Can't append execution provider: ${a}.`)}},Cp=async e=>{let t=$e(),r=0,i=[],n=e||{};Co(n);try{let a=Eo(n.graphOptimizationLevel??"all"),s=zo(n.executionMode??"sequential"),u=typeof n.logId=="string"?Xe(n.logId,i):0,l=n.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let p=n.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let c=typeof n.optimizedModelFilePath=="string"?Xe(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(a,!!n.enableCpuMemArena,!!n.enableMemPattern,s,!!n.enableProfiling,0,u,l,p,c),r===0&&ge("Can't create session options."),n.executionProviders&&await Ao(r,n,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);Et(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[f,g]of Object.entries(n.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let b=Xe(f,i);t._OrtAddFreeDimensionOverride(r,b,g)!==0&&ge(`Can't set a free dimension override: ${f} - ${g}.`)}return n.extra!==void 0&&Kr(n.extra,"",new WeakSet,(f,g)=>{Et(r,f,g,i)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&ge("Can't release session options."),i.forEach(s=>t._free(s)),a}}}),Mt,ot,Bt,ti,Zr,Qn,Yn,An,ne=L(()=>{"use strict";Mt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ot=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Bt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,a)=>n*a,1);return r>0?Math.ceil(i*r):void 0},ti=e=>{switch(e){case"float16":return typeof Float16Array<"u"?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Zr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Qn=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Yn=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",An=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Jn,Ap=L(()=>{"use strict";jn(),Jn=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),a;try{a=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let l=Math.ceil(i/65536);a=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let s=0;for(;;){let{done:u,value:l}=await n.read();if(u)break;let p=l.byteLength;new Uint8Array(a,s,p).set(l),s+=p}return new Uint8Array(a,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Oo,Ro,Mo,Bo,ea,Do,ce,lt=L(()=>{"use strict";ne(),Oo=["V","I","W","E","F"],Ro=(e,t)=>{console.log(`[${Oo[e]},${new Date().toISOString()}]${t}`)},ea=(e,t)=>{Mo=e,Bo=t},Do=(e,t)=>{let r=Zr(e),i=Zr(Mo);r>=i&&Ro(r,typeof t=="function"?t():t)},ce=(...e)=>{Bo&&Do(...e)}}),No,Kt,B,Xr,Op,Rp,Mp,ae=L(()=>{"use strict";No=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Kt=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(r){if(i<2||n<2)return;let u=No.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(u===void 0)return;[s[a-2],s[a-1]]=u}for(let u=r?3:1;u<=a;u++){let l=i-u<0?1:e[i-u],p=n-u<0?1:t[n-u];if(l!==p&&l>1&&p>1)return;let c=Math.max(l,p);if(l&&p)s[a-u]=Math.max(l,p);else{if(c>1)return;s[a-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},B=class Hr{static size(t){return Hr.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),a=i-1;for(;a>=0;){if(t[a]%r===0){n[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");n[a]=1,r/=t[a],a--}for(a--;a>=0;a--)n[a]=t[a];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Hr.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Hr.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let a=r;a<i;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[a])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,a)=>n+r[a]+r[a+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},Xr=class wt{static adjustPoolAttributes(t,r,i,n,a,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<n.length){if(n[u]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=i[u]||s[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,a,s,u){if(u){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)wt.adjustPadAndReturnShape(t[l+(s?1:2)],r[l],i[l],n[l],a,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,n,a,s,u,l=0){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let p=[r[0],r[1]];return wt.computeShapeHelper(t,r,p,i,n,a,s,u,l),p}static computeConvOutputShape(t,r,i,n,a,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return wt.computeShapeHelper(!1,t,l,i,n,a,s,u),l}static computeShapeHelper(t,r,i,n,a,s,u,l,p=0){if(t)for(let c=0;c<r.length-2;c++)i.push(1);else for(let c=0;c<r.length-2;c++)i.push(wt.adjustPadAndReturnShape(r[c+2],n[c],a[c],s[c],u,c,c+r.length-2,l,p))}static computeOutputSize(t,r,i,n,a){let s=Math.floor(t/r)+1;return a===1&&(s=Math.ceil(t/r)+1,(s-1)*r>=i+n&&(s-=1)),s}static adjustPadAndReturnShape(t,r,i,n,a,s,u,l,p=0){let c=i*(n-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return a[s]=0,a[u]=0,wt.computeOutputSize(t-c,r,t,0,p);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let f=(Math.floor((t+r-1)/r)-1)*r+n-t;return a[s]=Math.floor(l==="SAME_LOWER"?(f+1)/2:f/2),a[u]=f-a[s],wt.computeOutputSize(t+a[s]+a[u]-c,r,t,a[s],p)}default:throw new Error("Unsupported AutoPad type")}else return wt.computeOutputSize(t+a[s]+a[u]-c,r,t,a[s],p)}},Op=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let a,s,u;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==s)throw new Error("dimension mismatch");if(a<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(n&&!Kt.isValidBroadcast(n,[a,u]))throw new Error("gemm: invalid bias shape for broadcast");return[a,u,s]}},Rp=-34028234663852886e22,Mp=34028234663852886e22}),ta,Bp=L(()=>{"use strict";ne(),ta=(e,t)=>new(ti(t))(e)}),Pi,Uo,qi,Po,Li,qo,Wi,Vi,Gi,Lo,Dp,C0=L(()=>{"use strict";ne(),lt(),Pi=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Uo=(e,t)=>{if(t==="int32")return e;let r=Pi.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,a=new(ti(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let s=new Int32Array(n);for(let u=0;u<n;u++){let l=a[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},qi=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Po=1,Li=()=>Po++,qo=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Wi=(e,t)=>{let r=Pi.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},Vi=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Wi(this.dataType,this.tensorShape)}destroy(){ce("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=qi(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return new Uint8Array(r).buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},Gi=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),a=this.tensorManager.getMLOpSupportLimits(e),s;if(!a?.input.dataTypes.includes(t)){if(s=qo.get(t),!s||a?.input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);ce("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==Wi(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,u,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Uo(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ce("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?qi(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Lo=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}getMLOpSupportLimits(e){return this.backend.getMLOpSupportLimits(e)}reserveTensorId(){let e=Li();return this.tensorTrackersById.set(e,new Gi(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){ce("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){ce("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),a=Li(),s=new Vi({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(a,new Gi(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,r,i,n,a,s){let u=this.getMLContext(e);for(let[p,c]of this.freeTensors.entries())if(c.canReuseTensor(u,t,r)){ce("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let f=this.freeTensors.splice(p,1)[0];return f.sessionId=e,f}ce("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let l=await u.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:n,readable:a});return new Vi({sessionId:e,context:u,tensor:l,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Dp=(...e)=>new Lo(...e)}),ir,Wo,Np,A0=L(()=>{"use strict";ne(),Lt(),Bp(),C0(),lt(),ir=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Wo=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,a)=>n===i[a]&&e[n]===t[n])},Np=class{constructor(e){this.tensorManager=Dp(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,ea(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ce("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ce("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)ce("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Wo(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.mlOpSupportLimitsBySessionId.has(e)||this.mlOpSupportLimitsBySessionId.set(e,t.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e),this.mlOpSupportLimitsBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}getMLOpSupportLimits(e){return this.mlOpSupportLimitsBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ce("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let a=ir.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,i,n)}async createTemporaryTensor(e,t,r){ce("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=ir.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!$e().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ce("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return ta(r,t)}}registerMLTensor(e,t,r,i){let n=ir.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.registerTensor(e,t,n,i);return ce("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${a}}`),a}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=ir.get(Mt(t)),n=this.mlOpSupportLimitsBySessionId.get(e);return typeof i>"u"?!1:r?!!n?.input.dataTypes.includes(i):!!n?.output.dataTypes.includes(i)}flush(){}}}),ra=L(()=>{"use strict"}),Hi,Mr,Br,Vo,Go,Fi,On,Ho,Up,O0=L(()=>{"use strict";lt(),ra(),Hi=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Mr=[],Br=e=>Math.ceil(Number(e)/16)*16,Vo=e=>{for(let t=0;t<Mr.length;t++){let r=Mr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Go=1,Fi=()=>Go++,On=async(e,t,r,i)=>{let n=Br(r),a=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,n),e.flush(),await a.mapAsync(GPUMapMode.READ);let u=a.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{a.destroy()}},Ho=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Hi)Mr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,a=Br(n),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${n}`);if(a===n&&i%4===0)this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,r,i,n);else{let u=new Uint8Array(a);u.set(t),this.backend.device.queue.writeBuffer(s.gpuData.buffer,0,u,0,a)}ce("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=Br(r.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return ce("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=Fi();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),ce("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ce("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Vo(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||a){let u=(n?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:Fi(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),ce("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ce("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await On(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Hi.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ce("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Up=(...e)=>new Ho(...e)}),Fo,me,Ie=L(()=>{"use strict";Fo=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},me=e=>new Fo(e)}),Zt,Dr,Ae,Ce,J,Te,Rn,jt,$t,Q,nr,D,X,Pp,ia,jo,qp,se=L(()=>{"use strict";ne(),ae(),Zt=64,Dr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Ae=(e,t=1)=>{let r=Dr(e,t);return typeof r=="string"?r:r[0]},Ce=(e,t=1)=>{let r=Dr(e,t);return typeof r=="string"?r:r[1]},J=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:B.computeStrides(r)})}),t},Te=e=>e%4===0?4:e%2===0?2:1,Rn=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,jt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,$t=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,Q=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,nr=(e,t,r,i,n)=>{let a=typeof r=="number",s=a?r:r.length,u=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=Dr(t,n),c=typeof p=="string"?p:p[1],f=typeof p=="string"?p:p[0],g={indices:l,value:c,storage:f,tensor:t},b=P=>typeof P=="string"?P:`${P}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},v=a?"uniforms.":"",T=`${v}${e}_shape`,k=`${v}${e}_strides`,$="";for(let P=0;P<s-1;P++)$+=`
    let dim${P} = current / ${Q(k,P,s)};
    let rest${P} = current % ${Q(k,P,s)};
    indices[${P}] = dim${P};
    current = rest${P};
    `;$+=`indices[${s-1}] = current;`;let E=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${$}
    return indices;
  }`,I=P=>(_.offsetToIndices=!0,s<2?P:`o2i_${e}(${P})`),C=[];if(s>=2)for(let P=s-1;P>=0;P--)C.push(`${Q(k,P,s)} * (indices[${P}])`);let A=s<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${C.join("+")};
  }`,R=P=>(_.indicesToOffset=!0,s<2?P:`i2o_${e}(${P})`),x=(...P)=>s===0?"0u":`${g.indices}(${P.map(b).join(",")})`,U=(P,ie)=>s<2?`${P}`:`${Q(P,ie,s)}`,V=(P,ie,K)=>s<2?`${P}=${K};`:`${Q(P,ie,s)}=${K};`,H={},W=(P,ie)=>{_.broadcastedIndicesToOffset=!0;let K=`${ie.name}broadcastedIndicesTo${e}Offset`;if(K in H)return`${K}(${P})`;let Z=[];for(let _e=s-1;_e>=0;_e--){let Ee=ie.indicesGet("outputIndices",_e+ie.rank-s);Z.push(`${U(k,_e)} * (${Ee} % ${U(T,_e)})`)}return H[K]=`fn ${K}(outputIndices: ${ie.type.indices}) -> u32 {
             return ${Z.length>0?Z.join("+"):"0u"};
           }`,`${K}(${P})`},F=(P,ie)=>(()=>{if(g.storage===g.value)return`${e}[${P}]=${ie};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${P}]=vec2<u32>(u32(${ie}), select(0u, 0xFFFFFFFFu, ${ie} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${P}]=vec2<u32>(u32(${ie}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${P}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${ie}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),re=P=>(()=>{if(g.storage===g.value)return`${e}[${P}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${P}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${P}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${P}] & 0xFFu), bool(${e}[${P}] & 0xFF00u), bool(${e}[${P}] & 0xFF0000u), bool(${e}[${P}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),O=s<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${c} {
    return ${re(`i2o_${e}(indices)`)};
  }`,q=s<2?"":(()=>{let P=u.map(K=>`d${K}: u32`).join(", "),ie=u.map(K=>`d${K}`).join(", ");return`
  fn get_${e}(${P}) -> ${c} {
    return get_${e}ByIndices(${x(ie)});
  }`})(),ee=(...P)=>{if(P.length!==s)throw new Error(`indices length must be ${s}`);let ie=P.map(b).join(",");return s===0?re("0u"):s===1?re(ie[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${ie})`)},te=P=>s<2?re(P):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${P})`),Y=s<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${c}) {
    ${F(`i2o_${e}(indices)`,"value")}
  }`,oe=s<2?"":(()=>{let P=u.map(K=>`d${K}: u32`).join(", "),ie=u.map(K=>`d${K}`).join(", ");return`
  fn set_${e}(${P}, value: ${c}) {
    set_${e}ByIndices(${x(ie)}, value);
  }`})();return{impl:()=>{let P=[],ie=!1;return _.offsetToIndices&&(P.push(E),ie=!0),_.indicesToOffset&&(P.push(A),ie=!0),_.broadcastedIndicesToOffset&&(Object.values(H).forEach(K=>P.push(K)),ie=!0),_.set&&(P.push(oe),ie=!0),_.setByIndices&&(P.push(Y),ie=!0),_.get&&(P.push(q),ie=!0),_.getByIndices&&(P.push(O),ie=!0),!a&&ie&&P.unshift(`const ${T} = ${g.indices}(${r.join(",")});`,`const ${k} = ${g.indices}(${B.computeStrides(r).join(",")});`),P.join(`
`)},type:g,offsetToIndices:I,indicesToOffset:R,broadcastedIndicesToOffset:W,indices:x,indicesGet:U,indicesSet:V,set:(...P)=>{if(P.length!==s+1)throw new Error(`indices length must be ${s}`);let ie=P[s];if(typeof ie!="string")throw new Error("value must be string");let K=P.slice(0,s).map(b).join(",");return s===0?F("0u",ie):s===1?F(K[0],ie):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${K}, ${ie})`)},setByOffset:F,setByIndices:(P,ie)=>s<2?F(P,ie):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${P}, ${ie});`),get:ee,getByOffset:re,getByIndices:te,usage:i,name:e,strides:k,shape:T,rank:s}},D=(e,t,r,i=1)=>nr(e,t,r,"input",i),X=(e,t,r,i=1)=>nr(e,t,r,"output",i),Pp=(e,t,r)=>nr(e,t,r,"atomicOutput",1),ia=(e,t,r,i=1)=>nr(e,t,r,"internal",i),jo=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Zt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},qp=(e,t)=>new jo(e,t)}),Ko,ji,Zo,Xo,Qo,Yo,qe,Lp,Wp,vt=L(()=>{"use strict";ne(),ae(),Ie(),se(),Ko=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},ji=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Zo=(e,t)=>B.sortBasedOnPerm(e,ji(e.length,t)),Xo=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)n+=`a[${e[a]}]=i[${a}];`;return n+="return a;}"},Qo=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},Yo=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},qe=(e,t)=>{let r=e.dataType,i=e.dims.length,n=ji(i,t),a=Zo(e.dims,n),s=e.dims,u=a,l=i<2||Yo(n,e.dims),p;if(l)return p=_=>{let v=D("input",r,s,4),T=X("output",r,u,4);return`
  ${_.registerUniform("output_size","u32").declareVariables(v,T)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:p};let{newShape:c,newPerm:f}=Qo(e.dims,n),g=B.areEqual(f,[2,3,1]),b=B.areEqual(f,[3,1,2]);if(c.length===2||g||b){s=g?[c[0],c[1]*c[2]]:b?[c[0]*c[1],c[2]]:c,u=[s[1],s[0]];let _=16;return p=v=>{let T=D("a",r,s.length),k=X("output",r,u.length);return`
  ${v.registerUniform("output_size","u32").declareVariables(T,k)}
  var<workgroup> tile : array<array<${k.type.value}, ${_+1}>, ${_}>;
  ${v.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${T.getByIndices(`${T.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${k.setByIndices(`${k.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let v=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/_),y:Math.ceil(u[0]/_)},programUniforms:[{type:12,data:v},...J(s,u)]}},getShaderSource:p}}return p=_=>{let v=D("a",r,s.length),T=X("output",r,u.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(v,T)}

  ${Xo(n,i,v,T)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${T.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${T.setByOffset("global_idx",v.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=B.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...J(s,u)]}},getShaderSource:p}},Lp=(e,t)=>{Ko(e.inputs,t.perm),e.compute(qe(e.inputs[0],t.perm))},Wp=e=>me({perm:e.perm})}),Jo,eu,tu,ru,iu,nu,au,su,ou,uu,He,Vp,Gp,Hp,Fp,jp,Kp,Zp,Xp,Qp,Yp,R0=L(()=>{"use strict";ne(),ae(),se(),na(),vt(),Jo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},eu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},tu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},ru={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},iu=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},nu=(e,t)=>{let r=[],i=e.length;for(let a=0;a<i;a++)t.indexOf(a)===-1&&r.push(e[a]);let n=t.map(a=>e[a]);return[r,n]},au=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?i.push(e[n++]):i.push(1);return i},su=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},ou=(e,t)=>{let r=[];if(!su(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},uu=(e,t,r,i,n,a,s)=>{let u=r[0].dims,l=B.size(a),p=B.size(s),c=D("_A",r[0].dataType,u),f=X("output",n,a),g=64;l===1&&(g=256);let b=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,_=v=>`
        ${v.registerUniform("reduceSize","u32").declareVariables(c,f)}
        ${b}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${v.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${tu[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${Jo[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${eu[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${i==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${ru[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},He=(e,t,r,i)=>{let n=e.inputs.length===1?r:Mn(e.inputs,r),a=n.axes;a.length===0&&!n.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((b,_)=>_));let s=B.normalizeAxes(a,e.inputs[0].dims.length),u=s,l=e.inputs[0],p=ou(u,e.inputs[0].dims.length);p.length>0&&(l=e.compute(qe(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],u=iu(u.length,l.dims.length));let[c,f]=nu(l.dims,u),g=c;n.keepDims&&(g=au(c,s)),e.compute(uu(t,n.cacheKey,[l],i,e.inputs[0].dataType,g,f),{inputs:[l]})},Vp=(e,t)=>{He(e,"ReduceMeanShared",t,"mean")},Gp=(e,t)=>{He(e,"ReduceL1Shared",t,"l1")},Hp=(e,t)=>{He(e,"ReduceL2Shared",t,"l2")},Fp=(e,t)=>{He(e,"ReduceLogSumExpShared",t,"logSumExp")},jp=(e,t)=>{He(e,"ReduceMaxShared",t,"max")},Kp=(e,t)=>{He(e,"ReduceMinShared",t,"min")},Zp=(e,t)=>{He(e,"ReduceProdShared",t,"prod")},Xp=(e,t)=>{He(e,"ReduceSumShared",t,"sum")},Qp=(e,t)=>{He(e,"ReduceSumSquareShared",t,"sumSquare")},Yp=(e,t)=>{He(e,"ReduceLogSumShared",t,"logSum")}}),Fe,lu,Qr,Mn,je,du,pu,cu,hu,fu,mu,gu,yu,_u,bu,Ke,Jp,ec,tc,rc,ic,nc,ac,sc,oc,uc,na=L(()=>{"use strict";ne(),ae(),Ie(),se(),R0(),Fe=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},lu=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Qr=(e,t,r,i,n,a,s=!1,u=!1)=>{let l=[],p=r[0].dims,c=p.length,f=B.normalizeAxes(n,c),g=!u&&f.length===0;p.forEach((v,T)=>{g||f.indexOf(T)>=0?s&&l.push(1):l.push(v)});let b=l.length,_=B.size(l);return{name:e,shaderCache:t,getShaderSource:v=>{let T=[],k=D("_A",r[0].dataType,c),$=X("output",a,b),E=i(k,$,f),I=E[2];for(let C=0,A=0;C<c;C++)g||f.indexOf(C)>=0?(s&&A++,I=`for(var j${C}: u32 = 0; j${C} < ${p[C]}; j${C}++) {
                  ${E[2].includes("last_index")?`let last_index = j${C};`:""}
                  ${k.indicesSet("input_indices",C,`j${C}`)}
                  ${I}
                }`):(T.push(`${k.indicesSet("input_indices",C,$.indicesGet("output_indices",A))};`),A++);return`

        ${v.registerUniform("output_size","u32").declareVariables(k,$)}

        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${k.type.indices};
          let output_indices = ${$.offsetToIndices("global_idx")};

          ${T.join(`
`)}
          ${E[0]}       // init ops for reduce max/min
          ${E[1]}
          ${I}
          ${E[3]}
          ${E.length===4?$.setByOffset("global_idx","value"):E.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:a}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...J(p,l)]})}},Mn=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),me({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},je=(e,t,r,i)=>{let n=e.inputs,a=n.length===1?r:Mn(n,r);e.compute(Qr(t,{hint:a.cacheKey,inputDependencies:["rank"]},[n[0]],a.noopWithEmptyAxes&&a.axes.length===0?lu:i,a.axes,n[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},du=(e,t)=>{Fe(e.inputs),je(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},pu=(e,t)=>{Fe(e.inputs),je(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},cu=(e,t)=>{Fe(e.inputs),je(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},hu=(e,t)=>{Fe(e.inputs),je(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},fu=(e,t)=>{Fe(e.inputs),je(e,"ReduceMax",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(r.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},mu=(e,t)=>{Fe(e.inputs),je(e,"ReduceMean",t,(r,i,n)=>{let a=1;for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${a});`]})},gu=(e,t)=>{Fe(e.inputs),je(e,"ReduceMin",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},yu=(e,t)=>{Fe(e.inputs),je(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},_u=(e,t)=>{Fe(e.inputs),je(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},bu=(e,t)=>{Fe(e.inputs),je(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Ke=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?i*=e[a]:n*=e[a];return n<32&&i>1024},Jp=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mu(e,t):Vp(e,t)},ec=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?pu(e,t):Gp(e,t)},tc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?cu(e,t):Hp(e,t)},rc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hu(e,t):Fp(e,t)},ic=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fu(e,t):jp(e,t)},nc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gu(e,t):Kp(e,t)},ac=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yu(e,t):Zp(e,t)},sc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_u(e,t):Xp(e,t)},oc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bu(e,t):Qp(e,t)},uc=(e,t)=>{Ke(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?du(e,t):Yp(e,t)}}),Ki,lc,dc,Bn,M0=L(()=>{"use strict";ne(),Ie(),na(),Ki=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},lc=(e,t)=>{Ki(e.inputs);let r=(i,n,a)=>{let s=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Qr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},dc=(e,t)=>{Ki(e.inputs);let r=(i,n,a)=>{let s=[];for(let u=0;u<i.rank;u++)(a.indexOf(u)>=0||a.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(Qr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Bn=e=>me(e)}),wu,Nr,$u,vu,xu,yr,Su,pc,aa=L(()=>{"use strict";ne(),ae(),ra(),se(),wu=(e,t)=>{let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],p=r.dims[1],c=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=n.dims[0]/3,g=f,b=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let E of t.qkvHiddenSizes)if(E%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],b=t.qkvHiddenSizes[2]}let _=p;if(f!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==f+g+b)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let v=0;if(s){if(g!==b)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(v=s.dims[3])}let T=_+v,k=-1,$=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==T)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:v,kvSequenceLength:_,totalSequenceLength:T,maxSequenceLength:k,inputHiddenSize:c,hiddenSize:f,vHiddenSize:b,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(b/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Nr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,$u=(e,t,r,i,n,a,s,u)=>{let l=Te(s?1:a),p=64,c=a/l;c<p&&(p=32);let f=Math.ceil(a/l/p),g=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:c},{type:12,data:f}],b=Ae(e.dataType,l),_=Ce(1,l),v=["type"];s&&v.push("type"),u&&v.push("type");let T=k=>{let $=X("x",e.dataType,e.dims,l),E=[$],I=s?D("seq_lens",s.dataType,s.dims):void 0;I&&E.push(I);let C=u?D("total_sequence_length_input",u.dataType,u.dims):void 0;C&&E.push(C);let A=Ce(e.dataType),R=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${k.registerUniforms(R).declareVariables(...E)}
  ${k.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Nr(I,C,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${_}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${$.type.value}(${A}(1.0) / ${A}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${$.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${$.type.value}(${A}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${b};${l}`,inputDependencies:v},getShaderSource:T,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:g})}},vu=(e,t,r,i,n,a,s,u,l)=>{let p=s+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,p],f=e>1&&i,g=a.kvNumHeads?a.kvNumHeads:a.numHeads,b=f?[a.batchSize,g,p,a.headSize]:void 0,_=a.nReps?a.nReps:1,v=a.scale===0?1/Math.sqrt(a.headSize):a.scale,T=Te(a.headSize),k=a.headSize/T,$=12,E={x:Math.ceil(p/$),y:Math.ceil(a.sequenceLength/$),z:a.batchSize*a.numHeads},I=[{type:12,data:a.sequenceLength},{type:12,data:k},{type:12,data:p},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:v},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:_}],C=f&&i&&B.size(i.dims)>0,A=["type","type"];C&&A.push("type"),n&&A.push("type"),u&&A.push("type"),l&&A.push("type");let R=[{dims:c,dataType:t.dataType,gpuDataType:0}];f&&R.push({dims:b,dataType:t.dataType,gpuDataType:0});let x=U=>{let V=D("q",t.dataType,t.dims,T),H=D("key",r.dataType,r.dims,T),W=[V,H];if(C){let Y=D("past_key",i.dataType,i.dims,T);W.push(Y)}n&&W.push(D("attention_bias",n.dataType,n.dims));let F=u?D("seq_lens",u.dataType,u.dims):void 0;F&&W.push(F);let re=l?D("total_sequence_length_input",l.dataType,l.dims):void 0;re&&W.push(re);let O=X("output",t.dataType,c),q=[O];f&&q.push(X("present_key",t.dataType,b,T));let ee=Ce(1,T),te=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;

  var<workgroup> tileQ: array<${V.type.storage}, ${$*$}>;
  var<workgroup> tileK: array<${V.type.storage}, ${$*$}>;
  ${U.registerUniforms(te).declareVariables(...W,...q)}
  ${U.mainStart([$,$,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Nr(F,re,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${C&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${ee}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${C&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${ee}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(T){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${T}`)}})()};
        output[outputIdx] = ${O.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${T};${n!==void 0};${i!==void 0};${e}`,inputDependencies:A},getRunData:()=>({outputs:R,dispatchGroup:E,programUniforms:I}),getShaderSource:x}},xu=(e,t,r,i,n,a,s=void 0,u=void 0)=>{let l=a+n.kvSequenceLength,p=n.nReps?n.nReps:1,c=n.vHiddenSize*p,f=e>1&&i,g=n.kvNumHeads?n.kvNumHeads:n.numHeads,b=f?[n.batchSize,g,l,n.headSize]:void 0,_=[n.batchSize,n.sequenceLength,c],v=12,T={x:Math.ceil(n.vHeadSize/v),y:Math.ceil(n.sequenceLength/v),z:n.batchSize*n.numHeads},k=[{type:12,data:n.sequenceLength},{type:12,data:l},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:n.kvSequenceLength},{type:12,data:p}],$=f&&i&&B.size(i.dims)>0,E=["type","type"];$&&E.push("type"),s&&E.push("type"),u&&E.push("type");let I=[{dims:_,dataType:t.dataType,gpuDataType:0}];f&&I.push({dims:b,dataType:t.dataType,gpuDataType:0});let C=A=>{let R=D("probs",t.dataType,t.dims),x=D("v",r.dataType,r.dims),U=[R,x];$&&U.push(D("past_value",i.dataType,i.dims));let V=s?D("seq_lens",s.dataType,s.dims):void 0;s&&U.push(V);let H=u?D("total_sequence_length_input",u.dataType,u.dims):void 0;u&&U.push(H);let W=[X("output",t.dataType,_)];f&&W.push(X("present_value",t.dataType,b));let F=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;
  var<workgroup> tileQ: array<${R.type.value}, ${v*v}>;
  var<workgroup> tileV: array<${R.type.value}, ${v*v}>;
  ${A.registerUniforms(F).declareVariables(...U,...W)}
  ${A.mainStart([v,v,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Nr(V,H,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${$&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${R.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${$&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:E},getRunData:()=>({outputs:I,dispatchGroup:T,programUniforms:k}),getShaderSource:C}},yr=(e,t,r,i,n,a,s,u,l,p,c=void 0,f=void 0)=>{let g=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),b=g>1?s:void 0,_=g>1?u:void 0,v=g>1?p.pastSequenceLength:0,T=v+p.kvSequenceLength,k=l&&B.size(l.dims)>0?l:void 0,$=[t,r];b&&B.size(b.dims)>0&&$.push(b),k&&$.push(k),c&&$.push(c),f&&$.push(f);let E=e.compute(vu(g,t,r,b,k,p,v,c,f),{inputs:$,outputs:g>1?[-1,1]:[-1]})[0];e.compute($u(E,p.batchSize,p.numHeads,v,p.sequenceLength,T,c,f),{inputs:c&&f?[E,c,f]:[E],outputs:[]});let I=[E,i];_&&B.size(_.dims)>0&&I.push(_),c&&I.push(c),f&&I.push(f),e.compute(xu(g,E,i,_,p,v,c,f),{inputs:I,outputs:g>1?[0,2]:[0]})},Su=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,a=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:i},{type:12,data:n},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=f=>{let g=X("output_q",l[0].dataType,r),b=X("output_k",l[0].dataType,r),_=X("output_v",l[0].dataType,r),v=D("input",l[0].dataType,l[0].dims),T=D("weight",l[1].dataType,l[1].dims),k=D("bias",l[2].dataType,l[2].dims),$=v.type.storage,E=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${$}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${$}, ${s*s}>;
  var<workgroup> tileWeightK: array<${$}, ${s*s}>;
  var<workgroup> tileWeightV: array<${$}, ${s*s}>;
  ${f.registerUniforms(E).declareVariables(v,T,k,g,b,_)}
  ${f.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${$}(0);
    var valueK = ${$}(0);
    var valueV = ${$}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:p}),getShaderSource:c},{inputs:l,outputs:[-1,-1,-1]})},pc=(e,t)=>{let r=wu(e.inputs,t),[i,n,a]=Su(e,r);return yr(e,i,n,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),ku,Tu,Iu,cc,B0=L(()=>{"use strict";Ve(),ne(),ae(),Ie(),se(),ku=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,a)=>{let s=n.length;if(s!==i.length)throw new Error(`${a}: num dimensions != ${s}`);n.forEach((u,l)=>{if(u!==i[l])throw new Error(`${a}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Tu=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,a=e[0].dims,s=i?Te(a[a.length-1]):1,u=n==="NHWC"&&a.length>1?s:1,l=B.size(a)/s,p=i,c=p?a.length:a,f=D("x",e[0].dataType,e[0].dims,s),g=D("scale",e[1].dataType,e[1].dims,u),b=D("bias",e[2].dataType,e[2].dims,u),_=D("inputMean",e[3].dataType,e[3].dims,u),v=D("inputVar",e[4].dataType,e[4].dims,u),T=X("y",e[0].dataType,c,s),k=()=>{let E="";if(i)E=`let cOffset = ${a.length===1?"0u":n==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(n==="NCHW")E=`
            ${T.indicesSet("outputIndices","0","0")}
            let cOffset = ${T.indicesToOffset("outputIndices")};`;else{E=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let I=1;I<g.rank;I++)E+=`cIndices[${I}] = outputIndices[${I}];`;E+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return E},$=E=>`
  const epsilon = ${r};
  ${E.registerUniform("outputSize","u32").declareVariables(f,g,b,_,v,T)}
  ${E.mainStart()}
  ${E.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${T.offsetToIndices(`global_idx * ${s}`)};
    ${k()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${b.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${v.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${T.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...J(a)]:[{type:12,data:l}]})}},Iu=e=>me(e),cc=(e,t)=>{let{inputs:r,outputCount:i}=e,n=Iu({...t,outputCount:i});if(be.webgpu.validateInputContent&&ku(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Tu(r,n))}}),Eu,zu,hc,D0=L(()=>{"use strict";ae(),se(),Eu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},zu=e=>{let t=e[0].dims,r=e[0].dims[2],i=B.size(t)/4,n=e[0].dataType,a=D("input",n,t,4),s=D("bias",n,[r],4),u=D("residual",n,t,4),l=X("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:p=>`
  const channels = ${r}u / 4;
  ${p.declareVariables(a,s,u,l)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},hc=e=>{Eu(e.inputs),e.compute(zu(e.inputs))}}),Cu,fe,fc,mc,gc,yc,_c,bc,wc,$c,vc,Au,xc,Sc,kc,Tc,hr,Ic,Fr,Ec,zc,Cc,Ac,Oc,Rc,Mc,Bc,Dc,Nc,Uc,Pc,qc,Lc,Wc,Vc,Gc,Zi,Hc,Dn,Nn,Fc,jc,Kc,Ou,Ru,Zc,sa=L(()=>{"use strict";ne(),ae(),Ie(),se(),Cu=(e,t,r,i,n,a,s)=>{let u=Math.ceil(t/4),l="";typeof n=="string"?l=`${n}(a)`:l=n("a");let p=D("inputData",r,[u],4),c=X("outputData",i,[u],4),f=[{name:"vec_size",type:"u32"}];return s&&f.push(...s),`
      ${e.registerUniforms(f).declareVariables(p,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",l)}
  }`},fe=(e,t,r,i,n,a=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(B.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:p=>Cu(p,B.size(e.dims),e.dataType,a,r,i,u),getRunData:p=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(B.size(p[0].dims)/64/4)},programUniforms:l})}},fc=e=>{e.compute(fe(e.inputs[0],"Abs","abs"))},mc=e=>{e.compute(fe(e.inputs[0],"Acos","acos"))},gc=e=>{e.compute(fe(e.inputs[0],"Acosh","acosh"))},yc=e=>{e.compute(fe(e.inputs[0],"Asin","asin"))},_c=e=>{e.compute(fe(e.inputs[0],"Asinh","asinh"))},bc=e=>{e.compute(fe(e.inputs[0],"Atan","atan"))},wc=e=>{e.compute(fe(e.inputs[0],"Atanh","atanh"))},$c=e=>me(e),vc=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(fe(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Au=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return me({min:t,max:r})},xc=(e,t)=>{let r=t||Au(e.inputs),i=Ce(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},Sc=e=>{e.compute(fe(e.inputs[0],"Ceil","ceil"))},kc=e=>{e.compute(fe(e.inputs[0],"Cos","cos"))},Tc=e=>{e.compute(fe(e.inputs[0],"Cosh","cosh"))},hr=e=>me(e),Ic=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Fr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Ec=e=>{let t=Ce(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Fr(t)))},zc=e=>{e.compute(fe(e.inputs[0],"Exp","exp"))},Cc=e=>{e.compute(fe(e.inputs[0],"Floor","floor"))},Ac=e=>{let t=Ce(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Fr(t)))},Oc=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Rc=e=>{e.compute(fe(e.inputs[0],"Not",t=>`!${t}`))},Mc=e=>{e.compute(fe(e.inputs[0],"Neg",t=>`-${t}`))},Bc=e=>{e.compute(fe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Dc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Nc=e=>{e.compute(fe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Uc=e=>me(e),Pc=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},qc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"HardSwish",r=>`${r} * max(vec4<${t}>(0.0), min(vec4<${t}>(1.0), vec4<${t}>(${t}(1.0 / 6.0)) * ${r} + vec4<${t}>(0.5)))`))},Lc=e=>{e.compute(fe(e.inputs[0],"Sin","sin"))},Wc=e=>{e.compute(fe(e.inputs[0],"Sinh","sinh"))},Vc=e=>{e.compute(fe(e.inputs[0],"Sqrt","sqrt"))},Gc=e=>{e.compute(fe(e.inputs[0],"Tan","tan"))},Zi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Hc=e=>{e.compute(fe(e.inputs[0],"Tanh",Zi))},Dn=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Zi("v")};
}
`,Nn=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Fc=e=>{let t=Ce(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"FastGelu",Nn,Dn(t),void 0,e.inputs[0].dataType))},jc=(e,t)=>{let r=Ce(e.inputs[0].dataType);return e.compute(fe(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Kc=e=>{e.compute(fe(e.inputs[0],"Log","log"))},Ou=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Ru=e=>`quick_gelu_impl(${e})`,Zc=(e,t)=>{let r=Ce(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"QuickGelu",Ru,Ou(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Mu,Bu,Xc,N0=L(()=>{"use strict";ae(),se(),sa(),Mu=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Bu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=D("input",e[0].dataType,e[0].dims,4),i=D("bias",e[0].dataType,[e[0].dims[2]],4),n=X("output",e[0].dataType,t,4),a=B.size(t)/4,s=Ae(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,n)}

  ${Fr(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Xc=e=>{Mu(e.inputs),e.compute(Bu(e.inputs))}}),Du,Nu,Ze,Qc,Yc,Jc,eh,th,rh,ih,nh,ah,sh,U0=L(()=>{"use strict";ne(),ae(),se(),Du=(e,t,r,i,n,a,s,u,l,p,c,f)=>{let g,b;typeof u=="string"?g=b=($,E)=>`${u}((${$}),(${E}))`:typeof u=="function"?g=b=u:(g=u.scalar,b=u.vector);let _=X("outputData",c,i.length,4),v=D("aData",l,t.length,4),T=D("bData",p,r.length,4),k;if(n)if(a){let $=B.size(t)===1,E=B.size(r)===1,I=t.length>0&&t[t.length-1]%4===0,C=r.length>0&&r[r.length-1]%4===0;$||E?k=_.setByOffset("global_idx",b($?`${v.type.value}(${v.getByOffset("0")}.x)`:v.getByOffset("global_idx"),E?`${T.type.value}(${T.getByOffset("0")}.x)`:T.getByOffset("global_idx"))):k=`
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${v.broadcastedIndicesToOffset("outputIndices",_)};
            let offsetB = ${T.broadcastedIndicesToOffset("outputIndices",_)};
            ${_.setByOffset("global_idx",b(s||I?v.getByOffset("offsetA / 4u"):`${v.type.value}(${v.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||C?T.getByOffset("offsetB / 4u"):`${T.type.value}(${T.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else k=_.setByOffset("global_idx",b(v.getByOffset("global_idx"),T.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let $=(E,I,C="")=>{let A=`aData[indexA${I}][componentA${I}]`,R=`bData[indexB${I}][componentB${I}]`;return`
            let outputIndices${I} = ${_.offsetToIndices(`global_idx * 4u + ${I}u`)};
            let offsetA${I} = ${v.broadcastedIndicesToOffset(`outputIndices${I}`,_)};
            let offsetB${I} = ${T.broadcastedIndicesToOffset(`outputIndices${I}`,_)};
            let indexA${I} = offsetA${I} / 4u;
            let indexB${I} = offsetB${I} / 4u;
            let componentA${I} = offsetA${I} % 4u;
            let componentB${I} = offsetB${I} % 4u;
            ${E}[${I}] = ${C}(${g(A,R)});
          `};c===9?k=`
            var data = vec4<u32>(0);
            ${$("data",0,"u32")}
            ${$("data",1,"u32")}
            ${$("data",2,"u32")}
            ${$("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:k=`
            ${$("outputData[global_idx]",0)}
            ${$("outputData[global_idx]",1)}
            ${$("outputData[global_idx]",2)}
            ${$("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(v,T,_)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${k}
      }`},Nu=(e,t,r,i,n,a,s=r.dataType)=>{let u=r.dims.map(Number),l=i.dims.map(Number),p=!B.areEqual(u,l),c=u,f=B.size(u),g=!1,b=!1,_=[p];if(p){let v=Kt.calcShape(u,l,!1);if(!v)throw new Error("Can't perform binary op on the given tensors");c=v.slice(),f=B.size(c);let T=B.size(u)===1,k=B.size(l)===1,$=u.length>0&&u[u.length-1]%4===0,E=l.length>0&&l[l.length-1]%4===0;_.push(T),_.push(k),_.push($),_.push(E);let I=1;for(let C=1;C<c.length;C++){let A=u[u.length-C],R=l[l.length-C];if(A===R)I*=A;else break}I%4===0?(b=!0,g=!0):(T||k||$||E)&&(g=!0)}else g=!0;return _.push(g),{name:e,shaderCache:{hint:t+_.map(v=>v.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:v=>Du(v,u,l,c,g,p,b,n,r.dataType,i.dataType,s,a),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(B.size(c)/4)},...J(u,l,c)]})}},Ze=(e,t,r,i,n,a)=>{e.compute(Nu(t,n??"",e.inputs[0],e.inputs[1],r,i,a))},Qc=e=>{Ze(e,"Add",(t,r)=>`${t}+${r}`)},Yc=e=>{Ze(e,"Div",(t,r)=>`${t}/${r}`)},Jc=e=>{Ze(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},eh=e=>{Ze(e,"Mul",(t,r)=>`${t}*${r}`)},th=e=>{let t=D("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ze(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},rh=e=>{Ze(e,"Sub",(t,r)=>`${t}-${r}`)},ih=e=>{Ze(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},nh=e=>{Ze(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},ah=e=>{Ze(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},sh=e=>{Ze(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Uu,Pu,qu,Lu,oh,uh,P0=L(()=>{"use strict";ne(),ae(),Ie(),se(),Uu=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,a=i.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==n)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((l,p)=>{if(p!==t&&l!==i.dims[p])throw new Error("non concat dimensions must match")})}})},Pu=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,qu=(e,t)=>{let r=e.length,i=[];for(let n=0;n<r;++n){let a=t.setByOffset("global_idx",e[n].getByIndices("indices"));r===1?i.push(a):n===0?i.push(`if (inputIndex == ${n}u) { ${a} }`):n===r-1?i.push(`else { ${a} }`):i.push(`else if (inputIndex == ${n}) { ${a} }`)}return i.join(`
`)},Lu=(e,t,r,i)=>{let n=B.size(r),a=new Array(e.length),s=new Array(e.length),u=0,l=[],p=[],c=[{type:12,data:n}];for(let v=0;v<e.length;++v)u+=e[v].dims[t],a[v]=u,p.push(e[v].dims.length),s[v]=D(`input${v}`,i,p[v]),l.push("rank"),c.push({type:12,data:a[v]});for(let v=0;v<e.length;++v)c.push(...J(e[v].dims));c.push(...J(r));let f=X("output",i,r.length),g=f.indicesGet("indices",t),b=Array.from(Array(a.length).keys()).map(v=>`uniforms.sizeInConcatAxis${v}`).join(","),_=v=>`

  ${(()=>{v.registerUniform("outputSize","u32");for(let T=0;T<e.length;T++)v.registerUniform(`sizeInConcatAxis${T}`,"u32");return v.declareVariables(...s,f)})()}

  ${Pu(a.length,b)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${b});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${qu(s,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c}),getShaderSource:_}},oh=(e,t)=>{let r=e.inputs,i=r[0].dims,n=B.normalizeAxis(t.axis,i.length);Uu(r,n);let a=i.slice();a[n]=r.reduce((u,l)=>u+(l.dims.length>n?l.dims[n]:0),0);let s=r.filter(u=>B.size(u.dims)>0);e.compute(Lu(s,n,a,r[0].dataType),{inputs:s})},uh=e=>me({axis:e.axis})}),Ut,Pt,qt,oa,Wt=L(()=>{"use strict";ne(),ae(),Ut=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Pt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},qt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},oa=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Rp,Mp];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Me,lh,ua=L(()=>{"use strict";Me=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},lh=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),dh,q0=L(()=>{"use strict";dh=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),mr,la,da=L(()=>{"use strict";ne(),ae(),se(),Wt(),mr=(e,t,r,i,n)=>{let a=i-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${Q(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,Q(n,u+a,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},la=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],p=u[u.length-1],c=s[s.length-1],f=Te(p),g=Te(c),b=Te(l),_=B.size(r)/f/b,v=e.length>2,T=i?i.slice(0,-2):r.slice(0,-2),k=[B.size(T),l,p],$=[{type:12,data:_},{type:12,data:l},{type:12,data:p},{type:12,data:c}];Pt(t,$),$.push(...J(T,s,u)),v&&$.push(...J(e[2].dims)),$.push(...J(k));let E=I=>{let C=ia("batch_dims",e[0].dataType,T.length),A=D("a",e[0].dataType,s.length,g),R=D("b",e[1].dataType,u.length,f),x=X("output",e[0].dataType,k.length,f),U=Ae(x.type.tensor),V=Ut(t,x.type.value,U),H=[A,R],W="";if(v){let O=n?f:1;H.push(D("bias",e[2].dataType,e[2].dims.length,O)),W=`${n?`value += bias[col / ${O}];`:`value += ${x.type.value}(bias[row + i]);`}`}let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];qt(t,F);let re=()=>{let O=`var a_data: ${A.type.value};`;for(let q=0;q<g;q++)O+=`
              let b_data${q} = b[(b_offset + (k + ${q}) * uniforms.N + col) / ${f}];`;for(let q=0;q<b;q++){O+=`a_data = a[(a_offset + (row + ${q}) * uniforms.K + k) / ${g}];`;for(let ee=0;ee<g;ee++)O+=`
            values[${q}] = fma(${R.type.value}(a_data${g===1?"":`[${ee}]`}), b_data${ee}, values[${q}]);
`}return O};return`
  ${I.registerUniforms(F).registerInternalVariables(C).declareVariables(...H,x)}
  ${I.mainStart()}
    ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${b};
    let row = (index1 % stride1) * ${b};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${C.offsetToIndices("batch")};`}

    var a_indices: ${A.type.indices};
    ${mr("a_indices",A,A.rank-2,C.rank,"batch_indices")}
    ${A.indicesSet("a_indices",A.rank-2,0)}
    ${A.indicesSet("a_indices",A.rank-1,0)}
    let a_offset = ${A.indicesToOffset("a_indices")};

    var b_indices: ${R.type.indices};
    ${mr("b_indices",R,R.rank-2,C.rank,"batch_indices")}
    ${R.indicesSet("b_indices",R.rank-2,0)}
    ${R.indicesSet("b_indices",R.rank-1,0)}
    let b_offset = ${R.indicesToOffset("b_indices")};
    var values: array<${x.type.value}, ${b}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${re()}
    }
    for (var i = 0u; i < ${b}u; i++) {
      var value = values[i];
      ${W}
      ${V}
      let cur_indices = ${x.type.indices}(batch, row + i, col);
      let offset = ${x.indicesToOffset("cur_indices")};
      ${x.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${g};${b};${n}`,inputDependencies:v?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:$}),getShaderSource:E}}}),Wu,Vu,Un,Xi,Gu,Pn,Hu,Yr,pa=L(()=>{"use strict";ne(),ae(),se(),Wt(),da(),ua(),Wu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Vu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Un=(e,t,r="f32",i,n=!1,a=32,s=!1,u=32)=>{let l=t[1]*e[1],p=t[0]*e[0],c=n?l:a,f=n?a:l,g=c/t[0],b=a/t[1];if(!((n&&g===4&&e[1]===4||!n&&(g===3||g===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${c/g}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${b};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Wu(n,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Vu(n,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Xi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Gu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Pn=(e,t,r="f32",i,n=!1,a=32,s=!1,u=32,l=!1)=>{let p=e[1]*t[1],c=e[0]*t[0],f=n?p:a,g=n?a:p;if(!(g%t[1]===0&&f%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let b=g/t[1],_=f/t[0],v=a/t[1],T=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${Xi(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${b};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${v};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Xi(n,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${v}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Gu(n)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${T}
  }
`},Hu=(e,t,r,i,n=!1)=>{let[a,s,u,l]=i,p=Ae(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Me(e,p)} {
      var value = ${Me(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${mr("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Me(e,p)} {
      var value = ${Me(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${mr("bIndices",u,u.rank-2,a.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Me(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${Me(e,p)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Yr=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),p=u.slice(0,-2),c=i?i.slice(0,-2):r.slice(0,-2),f=B.size(c),g=s[s.length-2],b=s[s.length-1],_=u[u.length-1],v=b%4===0&&_%4===0,T=g<=8?[4,1,1]:[4,4,1],k=[8,8,1],$=[Math.ceil(_/k[0]/T[0]),Math.ceil(g/k[1]/T[1]),Math.ceil(f/k[2]/T[2])],E=v?4:1,I=[...l,g,b/E],C=I.length,A=[...p,b,_/E],R=A.length,x=[f,g,_/E],U=[{type:6,data:g},{type:6,data:_},{type:6,data:b}];Pt(t,U),U.push(...J(c,I,A));let V=["rank","rank"],H=e.length>2;H&&(U.push(...J(e[2].dims)),V.push("rank")),U.push(...J(x));let W=F=>{let re=c.length,O=ia("batchDims",e[0].dataType,re,1),q=Ae(e[0].dataType),ee=D("a",e[0].dataType,C,E),te=D("b",e[1].dataType,R,E),Y=X("result",e[0].dataType,x.length,E),oe=[ee,te];if(H){let _e=n?E:1;oe.push(D("bias",e[2].dataType,e[2].dims.length,_e))}let P=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];qt(t,P);let ie=Ae(Y.type.tensor),K=Ut(t,Y.type.value,ie),Z=Hu(E,H,K,[O,ee,te,Y],n);return`
  ${F.registerUniforms(P).registerInternalVariables(O).declareVariables(...oe,Y)}
  ${Z}
  ${v?Un(T,k,q,O):Pn(T,k,q,O)}
                   `};return{name:"MatMul",shaderCache:{hint:`${T};${t.activation};${v};${n}`,inputDependencies:V},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:U}),getShaderSource:W}}}),Fu,ph,L0=L(()=>{"use strict";ne(),lt(),se(),Wt(),ua(),q0(),pa(),Fu=(e,t,r,i,n=!1,a,s=4,u=4,l=4,p="f32")=>{let c=U=>{switch(U){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${U} is not supported.`)}},f=U=>{switch(U){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${U} is not supported.`)}},g=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,b=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,_=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",v=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",T=e?"row":"col",k=e?"col":"row",$=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${T} / outWidth;
    let outCol = ${T} % outWidth;

    let WRow = ${k} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${k} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${k} % inChannels;
    var resData = ${Me(s,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${v}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,E=e?t&&i?`
    let col = colIn * ${s};
    ${$}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${$}
    }
    return ${Me(s,p)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${$}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${$}
    }
    return ${Me(s,p)}(0.0);`,I=e?i&&r?f(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(u)}
    }
    return ${Me(u,p)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(u)}
    }
    return ${Me(u,p)}(0.0);`,C=Me(l,p),A=Me(e?s:u,p),R=Me(e?u:s,p),x=Ut(a,C,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?E:I}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${R} {
      ${e?I:E}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${C}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${b}
      ${lh(n)}
      ${x}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},ph=(e,t,r,i,n,a,s,u,l)=>{let p=t.format==="NHWC",c=p?e[0].dims[3]:e[0].dims[1],f=r[0],g=p?r[2]:r[3],b=p?r[1]:r[2],_=p?r[3]:r[1],v=p&&(c%4===0||c%3===0)&&_%4===0,T=p?_:g*b,k=p?g*b:_,$=[8,8,1],E=i<=8?[4,1,1]:[4,4,1],I=[Math.ceil(T/$[0]/E[0]),Math.ceil(k/$[1]/E[1]),Math.ceil(f/$[2]/E[2])];ce("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${I}`);let C=v?p&&c%4!==0?3:4:1,A=$[1]*E[1],R=$[0]*E[0],x=Math.max($[0]*C,$[1]),U=i%A===0,V=n%R===0,H=a%x===0,W=v?[C,4,4]:[1,1,1],F=[{type:6,data:i},{type:6,data:n},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Pt(t,F),F.push(...J(e[0].dims,e[1].dims));let re=["rank","rank"];s&&(F.push(...J(e[2].dims)),re.push("rank")),F.push(...J(r));let O=q=>{let ee=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];qt(t,ee);let te=v?4:1,Y=Ae(e[0].dataType),oe=`
      fn setOutputAtIndex(flatIndex : i32, value : ${v?`vec4<${Y}>`:Y}) {
        result[flatIndex] = ${v?`vec4<${Y}>`:Y}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${v?`vec4<${Y}>`:Y}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${v?"/ 4":""}, value);
      }`,P=D("x",e[0].dataType,e[0].dims.length,C===3?1:C),ie=D("w",e[1].dataType,e[1].dims.length,te),K=[P,ie],Z=X("result",e[0].dataType,r.length,te);if(s){let _e=D("bias",e[2].dataType,e[2].dims.length,te);K.push(_e),oe+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${v?`vec4<${Y}>`:Y} {
          return bias[coords.${p?"w":"y"}${v?"/ 4":""}];
        }`}return`
        ${dh("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${q.registerUniforms(ee).declareVariables(...K,Z)}
        ${oe}
        ${Fu(p,U,V,H,s,t,W[0],W[1],W[2],Y)}
        ${v?Un(E,$,Y,void 0,!p,x):Pn(E,$,Y,void 0,!p,x,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${C};${v};${U};${V};${H};${A};${R};${x}`,inputDependencies:re},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:I[0],y:I[1],z:I[2]},programUniforms:F}),getShaderSource:O}}}),ju,Qi,ar,Ku,Yi,Zu,ch,hh,W0=L(()=>{"use strict";ne(),lt(),ae(),se(),Wt(),ua(),ju=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Qi=e=>typeof e=="number"?[e,e,e]:e,ar=(e,t)=>t<=1?e:e+(e-1)*(t-1),Ku=(e,t,r,i=1)=>{let n=ar(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},Yi=(e,t,r,i,n)=>{n==null&&(n=Ku(e,t[0],i[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*n>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*n)/i[s]+1));return a},Zu=(e,t,r,i,n,a,s,u,l,p)=>{let c,f,g,b;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let _=Yi([t,r,i,1],[u,l,p],1,[n,a,s],e);f=_[0],g=_[1],b=_[2]}else if(Array.isArray(e)){if(!e.every((v,T,k)=>v===k[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let _=Yi([t,r,i,1],[u,l,p],1,[n,a,s],e[0]);f=_[0],g=_[1],b=_[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/n),g=Math.ceil(r/a),b=Math.ceil(i/s);let _=(f-1)*n+u-t,v=(g-1)*a+l-r,T=(b-1)*s+p-i,k=Math.floor(_/2),$=_-k,E=Math.floor(v/2),I=v-E,C=Math.floor(T/2),A=T-C;c={top:E,bottom:I,left:C,right:A,front:k,back:$}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:f,outHeight:g,outWidth:b}},ch=(e,t,r,i,n,a=!1,s="channelsLast")=>{let u,l,p,c,f;if(s==="channelsLast")[u,l,p,c,f]=e;else if(s==="channelsFirst")[u,f,l,p,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[g,,b,_,v]=t,[T,k,$]=Qi(r),[E,I,C]=Qi(i),A=ar(b,E),R=ar(_,I),x=ar(v,C),{padInfo:U,outDepth:V,outHeight:H,outWidth:W}=Zu(n,l,p,c,T,k,$,A,R,x),F=a?g*f:g,re=[0,0,0,0,0];return s==="channelsFirst"?re=[u,F,V,H,W]:s==="channelsLast"&&(re=[u,V,H,W,F]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:p,inWidth:c,inChannels:f,outDepth:V,outHeight:H,outWidth:W,outChannels:F,padInfo:U,strideDepth:T,strideHeight:k,strideWidth:$,filterDepth:b,filterHeight:_,filterWidth:v,effectiveFilterDepth:A,effectiveFilterHeight:R,effectiveFilterWidth:x,dilationDepth:E,dilationHeight:I,dilationWidth:C,inShape:e,outShape:re,filterShape:t}},hh=(e,t,r,i,n,a)=>{let s=a==="channelsLast",u=s?e[0].dims[3]:e[0].dims[1],l=!1,p=[64,1,1],c={x:r.map(($,E)=>E)},f=[Math.ceil(ju(c.x.map($=>r[$]))/p[0]),1,1];ce("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let g=l?s&&u%4!==0?3:4:1,b=B.size(r),_=[{type:12,data:b},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];Pt(t,_),_.push(...J(e[0].dims,e[1].dims));let v=["rank","rank"],T=e.length===3;T&&(_.push(...J(e[2].dims)),v.push("rank")),_.push(...J(r));let k=$=>{let E=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];qt(t,E);let I=l?4:1,C=Ae(e[0].dataType),A=D("x",e[0].dataType,e[0].dims.length,g===3?1:g),R=D("W",e[1].dataType,e[1].dims.length,I),x=[A,R],U=X("result",e[0].dataType,r.length,I),V="";if(T){let F=D("bias",e[2].dataType,e[2].dims.length,I);x.push(F),V+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${C}>`:C} {
          return bias[${s?Q("coords",4,5):Q("coords",1,5)}${l?"/ 4":""}];
        }`}let H=Me(g,C),W=Ut(t,H,C);return`
            ${V}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${R.getByIndices("aIndices")};
            }
          ${$.registerUniforms(E).declareVariables(...x,U)}
          ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${U.offsetToIndices("global_idx")};
              let batch = ${Q("coords",0,A.rank)};
              let d2 = ${s?Q("coords",A.rank-1,A.rank):Q("coords",1,A.rank)};
              let xFRCCorner = vec3<u32>(${s?Q("coords",1,A.rank):Q("coords",2,A.rank)},
              ${s?Q("coords",2,A.rank):Q("coords",3,A.rank)},
              ${s?Q("coords",3,A.rank):Q("coords",4,A.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?Q("uniforms.x_shape",1,A.rank):Q("uniforms.x_shape",2,A.rank)};
              let xShapeZ = ${s?Q("uniforms.x_shape",2,A.rank):Q("uniforms.x_shape",3,A.rank)};
              let xShapeW = ${s?Q("uniforms.x_shape",3,A.rank):Q("uniforms.x_shape",4,A.rank)};
              let xShapeU = ${s?Q("uniforms.x_shape",4,A.rank):Q("uniforms.x_shape",1,A.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${T?"value = value + getBiasByOutputCoords(coords)":""};
              ${W}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${g};${T}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:_}),getShaderSource:k}}}),fh,mh,V0=L(()=>{"use strict";ne(),ae(),se(),Wt(),fh=(e,t,r,i)=>{let n=e.length>2,a=n?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l=t.format==="NHWC",p=l?r[3]:r[1],c=p/t.group,f=l&&c>=4?Te(p):1,g=B.size(r)/f,b=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];Pt(t,b),b.push(...J(s,[u[0],u[1],u[2],u[3]/f]));let _=n?["rank","rank","rank"]:["rank","rank"];b.push(...J([r[0],r[1],r[2],r[3]/f]));let v=T=>{let k=X("output",e[0].dataType,r.length,f),$=Ae(k.type.tensor),E=Ut(t,k.type.value,$),I=D("x",e[0].dataType,s.length),C=D("w",e[1].dataType,u.length,f),A=[I,C];n&&A.push(D("b",e[2].dataType,e[2].dims,f));let R=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];qt(t,R);let x=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${I.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${C.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${I.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${C.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${T.registerUniforms(R).declareVariables(...A,k)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${k.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${k.type.value} = ${k.type.value}(0);
    ${x}
    ${a}
    ${E}
    ${k.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:b}),getShaderSource:v}},mh=(e,t,r,i)=>{let n=e.length>2,a=Te(r[3]),s=Te(r[2]),u=B.size(r)/a/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[r[0],r[1],r[2],r[3]/a],f=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Pt(t,f),f.push(...J(l,p,c));let g=(s-1)*t.strides[1]+p[1],b=_=>{let v=X("output",e[0].dataType,c.length,a),T=Ae(v.type.tensor),k=Ut(t,v.type.value,T),$=D("x",e[0].dataType,l.length,a),E=D("w",e[1].dataType,p.length,a),I=[$,E];n&&I.push(D("b",e[2].dataType,e[2].dims,a));let C=n?"value += b[output_channel];":"",A=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return qt(t,A),`
  ${_.registerUniforms(A).declareVariables(...I,v)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${$.type.value}, ${g}>;
    var values: array<${v.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${$.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${$.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${E.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${C}
      ${k}
      ${v.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${g};${p[0]};${p[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:b}}}),Xu,Ur,Qu,Pr,qn,Ji,Yu,Ju,Ln,G0=L(()=>{"use strict";ae(),L0(),W0(),pa(),V0(),Wt(),da(),vt(),Xu=(e,t,r,i,n,a)=>{let s=e[0],u=e.slice(a?1:2,a?3:4),l=u.length,p=t[0],c=t.slice(2).map((g,b)=>g+(g-1)*(r[b]-1)),f=u.map((g,b)=>g+i[b]+i[b+l]).map((g,b)=>Math.floor((g-c[b]+n[b])/n[b]));return f.splice(0,0,s),f.splice(a?3:1,0,p),f},Ur=[2,3,1,0],Qu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Pr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let i=e.pads.slice();Xr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},qn=e=>{let t=oa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,a=e.group,s=e.kernel_shape,u=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Ji=(e,t,r,i)=>{let n=r.format==="NHWC",a=Xu(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let A=[t[0]];if(n){let R=e.kernelCustomData.wT??e.compute(qe(t[1],Ur),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=R),A.push(R)}else A.push(t[1]);t.length===3&&A.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(mh(A,r,a,i),{inputs:A}):e.compute(fh(A,r,a,i),{inputs:A});return}let s=t.length===3,u=t[0].dims[n?1:2],l=t[0].dims[n?2:3],p=t[0].dims[n?3:1],c=t[1].dims[2],f=t[1].dims[3],g=a[n?1:2],b=a[n?2:3],_=a[n?3:1],v=n&&c===u&&f===l&&r.pads[0]===0&&r.pads[1]===0;if(v||c===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let A=a[0],R,x,U,V=[];if(n){let F=e.kernelCustomData.wT??e.compute(qe(t[1],Ur),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=F),v){let re=u*l*p;R=t[0].reshape([1,A,re]),x=F.reshape([1,re,_]),U=[1,A,_]}else R=t[0].reshape([A,u*l,p]),x=F.reshape([1,p,_]),U=[A,g*b,_];V.push(R),V.push(x)}else R=t[0].reshape([A,p,u*l]),x=t[1].reshape([1,_,p]),U=[A,_,g*b],V.push(x),V.push(R);s&&V.push(t[2]);let H=U[2],W=V[0].dims[V[0].dims.length-1];H<8&&W<8?e.compute(la(V,r,a,U,n,i),{inputs:V}):e.compute(Yr(V,r,a,U,n,i),{inputs:V});return}let T=!0,k=e.kernelCustomData.wT??e.compute(qe(t[1],Ur),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=k);let $=[t[0],k];s&&$.push(t[2]);let E=n?g*b:_,I=n?_:g*b,C=c*f*p;e.compute(ph($,r,a,E,I,C,s,T,i),{inputs:$})},Yu=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=Pr({...t,pads:n,strides:a,dilations:s,kernelShape:u},i);Ji(e,i,l,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},Ju=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=Pr(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=ch(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,i);e.compute(hh(t,n,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},Ln=(e,t)=>{if(Qu(e.inputs,t),e.inputs[0].dims.length===3)Yu(e,t);else if(e.inputs[0].dims.length===5)Ju(e,e.inputs,t);else{let r=Pr(t,e.inputs);Ji(e,e.inputs,r)}}}),gh,H0=L(()=>{"use strict";ne(),lt(),ae(),se(),gh=(e,t,r)=>{let i=e.length>2,n=t.outputShape,a=t.format==="NHWC",s=t.group,u=e[1].dims,l=u[2]/s,p=u[3],c=a?Te(l):1,f=a&&p===1&&l>=4,g=f?Math.floor(l/4)*4:Math.floor(l/c)*c,b=l-g,_=a?Te(p):1,v=a?p===1?c:_:1,T=B.size(n)/_,k=[Math.ceil(T/64),1,1];ce("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${k}`);let $=["rank","rank"],E=[t.strides[0],t.strides[1]],I=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],C=[t.dilations[0],t.dilations[1]],A=[I[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),I[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],R=[A[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),A[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],x=[{type:12,data:T},{type:12,data:E},{type:12,data:I},{type:12,data:C},{type:12,data:A},{type:6,data:R},{type:12,data:g},{type:12,data:l},{type:12,data:p},...J(e[0].dims,e[1].dims)];i&&(x.push(...J(e[2].dims)),$.push("rank")),x.push(...J(n));let U=V=>{let H=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:E.length},{name:"filter_dims",type:"u32",length:I.length},{name:"dilations",type:"u32",length:I.length},{name:"effective_filter_dims",type:"u32",length:A.length},{name:"pads",type:"i32",length:R.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],W=Ae(e[0].dataType),F=a?1:2,re=a?2:3,O=a?3:1,q=D("W",e[1].dataType,e[1].dims.length,v),ee=D("Dy",e[0].dataType,e[0].dims.length,c),te=[ee,q];i&&te.push(D("bias",e[2].dataType,[n[O]].length,_));let Y=X("result",e[0].dataType,n.length,_),oe=()=>{let K="";if(f)c===4?K+=`
        let xValue = ${ee.getByOffset("x_offset")};
        let wValue = ${q.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?K+=`
          dotProd = dotProd + dot(vec4<${W}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}), vec4<${W}>(${q.getByOffset("w_offset")}, ${q.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(K+=`
          dotProd = dotProd + dot(vec4<${W}>(${ee.getByOffset("x_offset")}, ${ee.getByOffset("x_offset + 1u")}, ${ee.getByOffset("x_offset + 2u")}, ${ee.getByOffset("x_offset + 3u")}), vec4<${W}>(${q.getByOffset("w_offset")}, ${q.getByOffset("w_offset + 1u")}, ${q.getByOffset("w_offset + 2u")}, ${q.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(K+=`
                  let xValue = ${a?ee.getByOffset(`${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):ee.get("batch","inputChannel","idyR","idyC")};
        `,c===1)K+=`
          let w_offset = ${q.indicesToOffset(`${q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${q.getByOffset(`w_offset / ${v}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let Z=0;Z<c;Z++)K+=`
            let wValue${Z} = ${q.getByOffset(`${q.indicesToOffset(`${q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${Z}, wOutChannel)`)} / ${v}`)};
            dotProd = dotProd + xValue[${Z}] * wValue${Z};`;return K},P=()=>{if(b===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let K="";if(c===1){K+="dotProd = dotProd";for(let Z=0;Z<b;Z++)K+=`
            + ${ee.getByOffset(`x_offset + ${Z}`)} * ${q.getByOffset(`w_offset + ${Z}`)}`;K+=";"}else if(c===2){if(b!==2)throw new Error(`Invalid inputChannelsRemainder ${b}.`);K+=`
          let xValue = ${ee.getByOffset("x_offset")};
          let wValue = ${q.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return K},ie=`
            let outputIndices = ${Y.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${Y.indicesGet("outputIndices",0)};
            let d1 = ${Y.indicesGet("outputIndices",O)};
            let r = ${Y.indicesGet("outputIndices",F)};
            let c = ${Y.indicesGet("outputIndices",re)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Y.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${W}(dyRCorner) + ${W}(wR)) / ${W}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${W}(uniforms.Dy_shape[${F}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${W}(dyCCorner) + ${W}(wC)) / ${W}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${W}(uniforms.Dy_shape[${re}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${ee.indicesToOffset(`${ee.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${q.indicesToOffset(`${q.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${v};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:c}) {
                  ${oe()}
                  inputChannel = inputChannel + ${f?4:c};
                }
                ${P()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${_}]`:""};
            ${Y.setByOffset("global_idx","value")};
          `;return`
    ${V.registerUniforms(H).declareVariables(...te,Y)}
      ${V.mainStart()}
      ${V.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${ie}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${v}${_}${f}${b}`,inputDependencies:$},getRunData:()=>({dispatchGroup:{x:k[0],y:k[1],z:k[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:U}}}),el,tl,rl,en,yh,il,tn,nl,_h,F0=L(()=>{"use strict";H0(),Wt(),vt(),el=(e,t,r,i,n,a)=>(e-1)*t+r+(i-1)*n+1-a,tl=(e,t,r,i,n)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=a,r[n]=e-a):t==="SAME_LOWER"&&(r[i]=e-a,r[n]=a)},rl=(e,t,r,i,n,a,s,u,l,p)=>{let c=e.length-2,f=p.length===0;l.length<c&&l.push(...Array(c-l.length).fill(0));let g=e[0],b=t[u?3:1]*n;for(let _=0,v=e.length-c-(u?1:0);_<c;++_,++v){let T=e[v],k=f?T*s[_]:p[_],$=el(T,s[_],a[_],t[v],r[_],k);tl($,i,a,_,_+c),f&&p.push(s[_]*(T-1)+l[_]+(t[v]-1)*r[_]+1-a[_]-a[_+c])}p.splice(0,0,g),p.splice(u?3:1,0,b)},en=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,g)=>f*g,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;l=new Array(f).fill(1)}let p=e.strides.slice();if(p.reduce((f,g)=>f+g,0)===0){let f=t[0].dims.length-2;p=new Array(f).fill(1)}rl(u,r,l,e.autoPad,e.group,n,p,i,s,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:n,outputPadding:s,outputShape:a,dilations:l,strides:p}),c},yh=e=>{let t=oa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,a=e.group??1,s=e.kernelShape,u=e.pads,l=e.strides,p=e.wIsConst(),c=e.outputPadding,f=e.outputShape;return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,outputPadding:c,outputShape:f,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},il=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},tn=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(qe(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let a=[t[0],n];t.length===3&&a.push(t[2]),e.compute(gh(a,r,i),{inputs:a})},nl=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),a=[1].concat(a),n=[1].concat(n);let l=t.outputPadding;l=[0].concat(l);let p=en({...t,pads:u,strides:s,dilations:a,kernelShape:n,outputPadding:l},i);tn(e,i,p,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},_h=(e,t)=>{if(il(e.inputs,t),e.inputs[0].dims.length===3)nl(e,t);else{let r=en(t,e.inputs);tn(e,e.inputs,r)}}}),al,bh,wh,j0=L(()=>{"use strict";ne(),ae(),Ie(),se(),al=(e,t,r,i)=>{let n=B.size(t),a=t.length,s=D("input",e,a),u=X("output",e,a),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=B.normalizeAxis(l,a),c=f=>{let g=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,b=Q("uniforms.input_shape","uniforms.axis",a),_=i.reverse?g+(i.exclusive?" + 1":""):"0",v=i.reverse?b:g+(i.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${v};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:p},...J(t,t)]}),getShaderSource:c}},bh=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(al(i,r,n,t),{inputs:[0]})},wh=e=>{let t=e.exclusive===1,r=e.reverse===1;return me({exclusive:t,reverse:r})}}),sl,ol,ul,$h,vh,K0=L(()=>{"use strict";ne(),ae(),Ie(),se(),sl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},ol=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)n.push(r.indicesSet("a",e[a],`i[${a}]`));return n.push("return a;}"),n.join(`
`)},ul=(e,t)=>{let r,i,n,a,s,u,l=t.format==="NHWC",p=t.blocksize,c=t.mode==="DCR";l?([r,i,n,a]=e.dims,s=c?[r,i,n,p,p,a/p**2]:[r,i,n,a/p**2,p,p],u=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[r,p,p,a/p**2,i,n]:[r,a/p**2,p,p,i,n],u=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(s),g=f.dims.length,b=e.dataType,_=D("a",b,g),v=X("output",b,g),T=k=>`
  ${k.registerUniform("output_size","u32").declareVariables(_,v)}

  ${ol(u,g,_,v)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:k=>{let $=l?[r,i*p,n*p,a/p**2]:[r,a/p**2,i*p,n*p],E=B.size($),I=f.dims,C=B.sortBasedOnPerm(I,u);return{outputs:[{dims:$,dataType:k[0].dataType}],dispatchGroup:{x:Math.ceil(E/64)},programUniforms:[{type:12,data:E},...J(I,C)]}},getShaderSource:T}},$h=(e,t)=>{sl(e.inputs),e.compute(ul(e.inputs[0],t))},vh=e=>me({blocksize:e.blocksize,mode:e.mode,format:e.format})}),at,sr,qr,rn,yt,ll,dl,pl,nn,an,sn,cl,hl,on,fl,xh,Sh,Z0=L(()=>{"use strict";ne(),ae(),Ie(),se(),at=256,sr=512,qr=2*Math.PI,rn=e=>{let t=[],r=e;for(let i of[4,2,3,5])for(;r%i===0;)t.push(i),r/=i;return r===1?t:void 0},yt=e=>{let t=e.toPrecision(9);return/[.eE]/.test(t)?t:`${t}.0`},ll=(e,t,r,i,n)=>{let a=r/e,s=sr-i,u=p=>`smem[${s}u + base + ${p*t}u]`,l=`  for (var t = local_idx; t < ${a}u; t += ${at}u) {
`;l+=`    let twiddleIndex = t % ${t}u;
    let angleUnit = f32(twiddleIndex);
`,l+=`    var leg: array<vec2<f32>, 5>;
`;for(let p=0;p<e;p++){let c=`${i}u + t + ${p*a}u`;if(p===0)l+=`    leg[0] = smem[${c}];
`;else{let f=n*qr*p/(e*t);l+=`    { let a = ${yt(f)} * angleUnit; leg[${p}] = cmul(smem[${c}], vec2<f32>(cos(a), sin(a))); }
`}}if(l+=`    let base = (t / ${t}u) * ${t*e}u + twiddleIndex;
`,e===2)l+=`    ${u(0)} = leg[0] + leg[1];
    ${u(1)} = leg[0] - leg[1];
`;else if(e===4){let p=n<0?"vec2<f32>(oddDiff.y, -oddDiff.x)":"vec2<f32>(-oddDiff.y, oddDiff.x)";l+=`    let evenSum = leg[0] + leg[2]; let evenDiff = leg[0] - leg[2];
`,l+=`    let oddSum = leg[1] + leg[3]; let oddDiff = leg[1] - leg[3];
`,l+=`    let oddRot = ${p};
`,l+=`    ${u(0)} = evenSum + oddSum;
    ${u(1)} = evenDiff + oddRot;
`,l+=`    ${u(2)} = evenSum - oddSum;
    ${u(3)} = evenDiff - oddRot;
`}else for(let p=0;p<e;p++){let c=["leg[0]"];for(let f=1;f<e;f++){let g=n*qr*(f*p)/e,b=yt(Math.cos(g)),_=yt(Math.sin(g));c.push(`vec2<f32>(leg[${f}].x*${b} - leg[${f}].y*${_}, leg[${f}].x*${_} + leg[${f}].y*${b})`)}l+=`    ${u(p)} = ${c.join(" + ")};
`}return`${l}  }
  workgroupBarrier();
`},dl=(e,t,r)=>{let i="",n=1,a=0;for(let s of e)i+=ll(s,n,t,a,r),n*=s,a=sr-a;return{code:i,resultOffset:a}},pl=(e,t,r,i,n)=>{let a=e.dims,s=a.length,u=a[s-1],l=a[t],p=r&&i?(l-1)*2:l;n!==void 0&&(p=n);let c=r&&i?1:2,f=i&&!r?Math.floor(p/2)+1:p,g=a.slice();g[t]=f,g[s-1]=c;let b=1;for(let v=t+1;v<s-1;v++)b*=a[v];let _=B.size(a)/u/l;return{dataType:e.dataType,outputDims:g,length:p,signalLength:l,inner:b,batch:_,inputComponents:u,outputComponents:c,outputLength:f,inverse:r,onesided:i}},nn=(e,t)=>[t,e.length,e.inputComponents,e.outputComponents,e.inverse,e.onesided].join(";"),an=e=>[{type:12,data:e.batch},{type:12,data:e.signalLength},{type:12,data:e.inner},{type:12,data:e.outputLength}],sn=(e,t,r)=>e.registerUniform("batch","u32").registerUniform("signalLength","u32").registerUniform("inner","u32").registerUniform("outputLength","u32").declareVariables(t,r),cl=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:a,onesided:s}=e,u=Ce(t),l=a?1:-1,p=a?1/r:1,c=rn(r),f=g=>{let b=D("x",t,[1]),_=X("y",t,[1]),v=C=>{let A=`inBase + (${C}) * uniforms.inner * ${i}u`,R=`f32(${b.getByOffset(A)})`,x=i===2?`f32(${b.getByOffset(`${A} + 1u`)})`:"0.0";return`vec2<f32>(${R}, ${x})`},T;if(a&&s){let C=Math.floor(r/2)+1,A=r%2===0?`select(provided, provided - 1u, provided == ${C}u)`:"provided";T=`
    let provided = min(uniforms.signalLength, ${C}u);
    for (var i = local_idx; i < ${r}u; i += ${at}u) {
      if (i < provided) { smem[i] = ${v("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();
    for (var k = local_idx + 1u; k < ${A}; k += ${at}u) {
      let h = smem[k];
      smem[${r}u - k] = vec2<f32>(h.x, -h.y);
    }
    workgroupBarrier();`}else T=`
    let loadCount = min(uniforms.signalLength, ${r}u);
    for (var i = local_idx; i < ${r}u; i += ${at}u) {
      if (i < loadCount) { smem[i] = ${v("i")}; } else { smem[i] = vec2<f32>(0.0); }
    }
    workgroupBarrier();`;let{code:k,resultOffset:$}=dl(c,r,l),E=p===1?`smem[${$}u + i]`:`smem[${$}u + i] * ${yt(p)}`,I=n===2?_.setByOffset("off + 1u",`${u}(v.y)`):"";return`
  ${sn(g,b,_)}
  var<workgroup> smem: array<vec2<f32>, ${2*sr}>;
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${g.mainStart(at)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    ${T}
${k}    for (var i = local_idx; i < uniforms.outputLength; i += ${at}u) {
      let v = ${E};
      let off = outBase + i * uniforms.inner * ${n}u;
      ${_.setByOffset("off",`${u}(v.x)`)}
      ${I}
    }
  }`};return{name:"DFT",shaderCache:{hint:nn(e,"fft"),inputDependencies:["type"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:an(e),dispatchGroup:{x:e.batch}})}},hl=e=>{let{dataType:t,length:r,inputComponents:i,outputComponents:n,inverse:a,onesided:s}=e,u=Ce(t),l=a?1:-1,p=a?1/r:1,c=f=>{let g=D("x",t,[1]),b=X("y",t,[1]),_=E=>{let I=`inBase + (${E}) * uniforms.inner * ${i}u`,C=`f32(${g.getByOffset(I)})`,A=i===2?`f32(${g.getByOffset(`${I} + 1u`)})`:"0.0";return`vec2<f32>(${C}, ${A})`},v=a&&s?`fn spectrum(inBase: u32, k: u32) -> vec2<f32> {
    let provided = min(uniforms.signalLength, ${Math.floor(r/2)+1}u);
    if (k < provided) { return ${_("k")}; }
    let m = ${r}u - k;
    if (m < provided) {
      let h = ${_("m")};
      return vec2<f32>(h.x, -h.y);
    }
    return vec2<f32>(0.0, 0.0);
  }`:`fn spectrum(inBase: u32, n: u32) -> vec2<f32> {
    if (n < uniforms.signalLength) { return ${_("n")}; }
    return vec2<f32>(0.0, 0.0);
  }`,T=`
      let angle = ${yt(l*qr)} * f32(knMod) / ${yt(r)};
      acc += cmul(spectrum(inBase, n), vec2<f32>(cos(angle), sin(angle)));
      knMod += k;
      if (knMod >= ${r}u) { knMod -= ${r}u; }`,k=n===2?b.setByOffset("off + 1u",`${u}(v.y)`):"",$=p===1?"acc":`acc * ${yt(p)}`;return`
  ${sn(f,g,b)}
  fn cmul(a: vec2<f32>, b: vec2<f32>) -> vec2<f32> {
    return vec2<f32>(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
  }
  ${v}
  ${f.mainStart(at)}
    let row = workgroup_index;
    if (row >= uniforms.batch) { return; }
    let outer = row / uniforms.inner;
    let within = row % uniforms.inner;
    let inBase = (outer * uniforms.signalLength * uniforms.inner + within) * ${i}u;
    let outBase = (outer * uniforms.outputLength * uniforms.inner + within) * ${n}u;
    for (var k = local_idx; k < uniforms.outputLength; k += ${at}u) {
      var acc = vec2<f32>(0.0, 0.0);
      var knMod = 0u;
      for (var n = 0u; n < ${r}u; n++) {${T}
      }
      let v = ${$};
      let off = outBase + k * uniforms.inner * ${n}u;
      ${b.setByOffset("off",`${u}(v.x)`)}
      ${k}
    }
  }`};return{name:"DFT",shaderCache:{hint:nn(e,"direct"),inputDependencies:["type"]},getShaderSource:c,getRunData:()=>({outputs:[{dims:e.outputDims,dataType:t}],programUniforms:an(e),dispatchGroup:{x:e.batch}})}},on=e=>{if(!e||e.dataType===0)return;if(B.size(e.dims)!==1)throw new Error("DFT optional scalar inputs must have exactly 1 element.");if(e.dataType===6)return e.getInt32Array()[0];let t=Number(e.getBigInt64Array()[0]);if(!Number.isSafeInteger(t))throw new Error("DFT optional scalar inputs are out of JavaScript safe integer range.");return t},fl=e=>{if(!e||e.length<1)throw new Error("DFT requires at least 1 input.");let t=e[0].dims;if(t.length<2)throw new Error("DFT input must have at least 2 dimensions.");let r=t[t.length-1];if(r!==1&&r!==2)throw new Error("DFT input's innermost dimension must be 1 (real) or 2 (complex).")},xh=(e,t)=>{fl(e.inputs);let r=e.inputs[0],i=r.dims.length,n=t.inverse!==0,a=t.onesided!==0,s=on(e.inputs[1]);if(s!==void 0&&s<=0)throw new Error("dft_length must be greater than zero.");let u=B.normalizeAxis(on(e.inputs[2])??t.axis,i);if(u===i-1)throw new Error("DFT axis must refer to a signal dimension, not the innermost (real/imaginary) dimension.");if(n&&a&&r.dims[i-1]!==2)throw new Error("Inverse one-sided DFT (IRFFT) requires complex-valued input (innermost dimension 2).");let l=pl(r,u,n,a,s);if(l.length<=0)throw new Error(`Invalid DFT length: ${l.length}`);let p=l.length<=sr&&rn(l.length)!==void 0?cl(l):hl(l);e.compute(p,{inputs:[0]})},Sh=e=>me({axis:e.axis??1,inverse:e.inverse??0,onesided:e.onesided??0})}),Lr,or,un,ml,gl,yl,_l,ln,bl,kh,Th,X0=L(()=>{"use strict";ne(),ae(),Ie(),se(),Lr="[a-zA-Z]|\\.\\.\\.",or="("+Lr+")+",un="^"+or+"$",ml="("+or+",)*"+or,gl="^"+ml+"$",yl=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},_l=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(gl)))throw new Error("Invalid LHS term");if(r.split(",").forEach((n,a)=>{let s=e[a].dims.slice();if(!n.match(RegExp(un)))throw new Error("Invalid LHS term");let u=this.processTerm(n,!0,s,a);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([n,a])=>a.count===1||n==="...").map(([n])=>n).join("");else if(!i.match(RegExp(or)))throw new Error("Invalid RHS");i.match(RegExp(Lr,"g"))?.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(n);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,a=!1,s=[],u=0;if(!e.match(RegExp(un))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Lr,"g")),p=new yl(i);return l?.forEach((c,f)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let g=n-l.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let b=0;b<s.length;b++){let _=String.fromCharCode(48+b);p.addSymbol(_,f+b),this.addSymbol(_,r[u++],i)}}else p.addSymbol(c,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[u++],i)}),p}},ln=e=>e+"_max",bl=(e,t,r,i)=>{let n=e.map(p=>p.length).map((p,c)=>D(`input${c}`,t,p)),a=B.size(i),s=X("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(p=>!r.rhs.symbolToIndices.has(p)),l=p=>{let c=[],f="var prod = 1.0;",g="var sum = 0.0;",b="sum += prod;",_=[],v=[],T=[],k=[],$=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((I,C)=>{if(r.rhs.symbolToIndices.has(C)){let A=r.rhs.symbolToIndices.get(C)?.[0];A!==void 0&&r.lhs.forEach((R,x)=>{if(I.inputIndices.includes(x)){let U=R.symbolToIndices.get(C);if(U===void 0)throw new Error("Invalid symbol error");U.forEach(V=>{c.push(`${n[x].indicesSet(`input${x}Indices`,V,s.indicesGet("outputIndices",A))}`)})}})}else r.lhs.forEach((A,R)=>{if(I.inputIndices.includes(R)){let x=A.symbolToIndices.get(C);if(x===void 0)throw new Error("Invalid symbol error");x.forEach(U=>{_.push(`${n[R].indicesSet(`input${R}Indices`,U,`${C}`)}`)}),k.push(`prod *= ${n[R].getByIndices(`input${R}Indices`)};`)}}),v.push(`for(var ${C}: u32 = 0; ${C} < uniforms.${ln(C)}; ${C}++) {`),T.push("}")});let E=$?[...c,`let sum = ${n.map((I,C)=>I.getByIndices(`input${C}Indices`)).join(" * ")};`]:[...c,g,...v,..._,f,...k,b,...T];return`
            ${p.registerUniforms(u.map(I=>({name:`${ln(I)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,s)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${n.map((I,C)=>`var input${C}Indices: ${n[C].type.indices};`).join(`
`)}
            ${E.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=u.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));p.push({type:12,data:a});let c=e.map((f,g)=>[...J(f)]).reduce((f,g)=>f.concat(g),p);return c.push(...J(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:l}},kh=(e,t)=>{let r=new _l(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((a,s)=>a.dims);e.compute(bl(n,e.inputs[0].dataType,r,i))},Th=e=>{let t=e.equation.replace(/\s+/g,"");return me({equation:t})}}),wl,dn,$l,vl,Ih,Q0=L(()=>{"use strict";ne(),ae(),se(),wl=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},dn=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},$l=(e,t)=>e.length>t.length?dn(e,t):dn(t,e),vl=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=$l(t,r),n=e[0].dataType,a=n===9||B.size(t)===1,s=n===9||t.length>0&&t[t.length-1]%4===0?4:1,u=a||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(B.size(i)/u),p=f=>{let g=D("input",n,t.length,s),b=X("output",n,i.length,u),_;if(n===9){let v=(T,k,$="")=>`
          let outputIndices${k} = ${b.offsetToIndices(`outputOffset + ${k}u`)};
          let offset${k} = ${g.broadcastedIndicesToOffset(`outputIndices${k}`,b)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${T}[${k}] = ${$}(${g.getByOffset(`index${k}`)}[component${k}]);
        `;_=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${v("data",0,"u32")}
        ${v("data",1,"u32")}
        ${v("data",2,"u32")}
        ${v("data",3,"u32")}
        ${b.setByOffset("global_idx","data")}
      }`}else _=`
        let outputIndices = ${b.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",b)};
        let data = ${b.type.value}(${g.getByOffset(`inputOffset / ${s}`)});
        ${b.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(g,b)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`},c=[{type:12,data:l},...J(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c})}},Ih=e=>{wl(e.inputs),e.compute(vl(e.inputs),{inputs:[0]})}}),xl,Eh,Y0=L(()=>{"use strict";ne(),ae(),se(),sa(),xl=e=>{let t=e[0].dataType,r=B.size(e[0].dims),i=B.size(e[1].dims),n=i%4===0,a=s=>{let u=D("x",t,[1],4),l=D("bias",t,[1],4),p=X("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=b=>`
      let bias${b}_offset: u32 = (global_idx * 4 + ${b}) % uniforms.bias_size;
      let bias${b} = ${l.getByOffset(`bias${b}_offset / 4`)}[bias${b}_offset % 4];`,g=n?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(u,l,p)}

    ${Dn(Ce(t))}

    ${s.mainStart(Zt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",Nn("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/Zt/4)}})}},Eh=e=>{e.inputs.length<2||B.size(e.inputs[1].dims)===0?Fc(e):e.compute(xl(e.inputs))}}),Sl,kl,zh,Ch,J0=L(()=>{"use strict";ne(),ae(),Ie(),se(),Sl=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},kl=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=B.normalizeAxis(t.axis,n),s=r.slice(0);s.splice(a,1,...i);let u=r[a],l=e[0].dataType===9?4:1,p=Math.ceil(B.size(s)/l),c=[{type:12,data:p},{type:6,data:u},{type:12,data:a},...J(e[0].dims,e[1].dims,s)],f=g=>{let b=D("data",e[0].dataType,e[0].dims.length,l),_=D("inputIndices",e[1].dataType,e[1].dims.length),v=X("output",e[0].dataType,s.length,l),T=$=>{let E=i.length,I=`var indicesIndices${$}  = ${_.type.indices}(0);`;for(let C=0;C<E;C++)I+=`${E>1?`indicesIndices${$}[${C}]`:`indicesIndices${$}`} = ${s.length>1?`outputIndices${$}[uniforms.axis + ${C}]`:`outputIndices${$}`};`;I+=`
          var idx${$} = ${_.getByIndices(`indicesIndices${$}`)};
          if (idx${$} < 0) {
            idx${$} = idx${$} + uniforms.axisDimLimit;
          }
          var dataIndices${$} : ${b.type.indices};
        `;for(let C=0,A=0;C<n;C++)C===a?(I+=`${n>1?`dataIndices${$}[${C}]`:`dataIndices${$}`} = u32(idx${$});`,A+=E):(I+=`${n>1?`dataIndices${$}[${C}]`:`dataIndices${$}`} = ${s.length>1?`outputIndices${$}[${A}]`:`outputIndices${$}`};`,A++);return I},k;if(e[0].dataType===9){let $=(E,I,C="")=>`
          let outputIndices${I} = ${v.offsetToIndices(`outputOffset + ${I}u`)};
          ${T(I)};
          let offset${I} = ${b.indicesToOffset(`dataIndices${I}`)};
          let index${I} = offset${I} / 4u;
          let component${I} = offset${I} % 4u;
          ${E}[${I}] = ${C}(${b.getByOffset(`index${I}`)}[component${I}]);
        `;k=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${$("value",0,"u32")}
        ${$("value",1,"u32")}
        ${$("value",2,"u32")}
        ${$("value",3,"u32")}
        ${v.setByOffset("global_idx","value")}
      `}else k=`
      let outputIndices = ${v.offsetToIndices("global_idx")};
      ${T("")};
      let value = ${b.getByIndices("dataIndices")};
      ${v.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(b,_,v)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${k}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:f}},zh=e=>me({axis:e.axis}),Ch=(e,t)=>{let r=e.inputs;Sl(r),e.compute(kl(e.inputs,t))}}),Tl,Ah,Oh,ey=L(()=>{"use strict";ne(),ae(),se(),Tl=(e,t,r,i,n,a,s,u,l)=>{let p=[{type:12,data:a},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:l}],c=[a];p.push(...J(t.dims,c));let f=g=>{let b=D("indices_data",t.dataType,t.dims.length),_=X("input_slice_offsets_data",12,1,1),v=[b,_],T=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(T).declareVariables(...v)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:p}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},Ah=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,a=r[1].dims,s=a[a.length-1],u=B.sizeToDimension(a,a.length-1),l=B.sizeFromDimension(i,t.batchDims+s),p=B.sizeToDimension(i,t.batchDims),c=B.sizeFromDimension(i,t.batchDims),f=u/p,g=new Array(s),b=l;for(let I=0;I<s;++I)g[s-1-I]=b,b*=i[t.batchDims+s-1-I];let _=Tl(e,r[1],g,t.batchDims,i,u,f,c,s),v=t.batchDims+s;if(v>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let T=a.slice(0,-1).concat(i.slice(v)),k=B.size(T),$=[{type:12,data:k},{type:12,data:l},...J(r[0].dims,_.dims,T)],E=I=>{let C=D("data",r[0].dataType,r[0].dims.length),A=D("slice_offsets",12,_.dims.length),R=X("output",r[0].dataType,T.length);return`
          ${I.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(C,A,R)}
            ${I.mainStart()}
            ${I.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:T,dataType:n}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:$}),getShaderSource:E},{inputs:[r[0],_]})},Oh=e=>({batchDims:e.batch_dims,cacheKey:""})}),Il,El,Rh,Mh,ty=L(()=>{"use strict";ne(),ae(),Ie(),se(),Il=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=B.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==n.dims.length||!n.dims.map((u,l)=>l===r?Math.ceil(u/i)===a.dims[l]:u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((u,l)=>u===a.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},El=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=B.normalizeAxis(t.gatherAxis,n),s=B.normalizeAxis(t.quantizeAxis,n),u=r.slice(0);u.splice(a,1,...i);let l=B.size(u),p=e[2].dataType,c=e[0].dataType===22,f=[{type:12,data:l},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...J(...e.map((b,_)=>b.dims),u)],g=b=>{let _=D("data",e[0].dataType,e[0].dims.length),v=D("inputIndices",e[1].dataType,e[1].dims.length),T=D("scales",e[2].dataType,e[2].dims.length),k=e.length>3?D("zeroPoint",e[3].dataType,e[3].dims.length):void 0,$=X("output",p,u.length),E=[_,v,T];k&&E.push(k);let I=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${b.registerUniforms(I).declareVariables(...E,$)}
        ${b.mainStart()}
        let output_indices = ${$.offsetToIndices("global_idx")};
        var indices_indices = ${v.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${$.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${v.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${$.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${$.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${v.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[a]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${$.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${T.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${T.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${T.getByIndices("scale_indices")};
        ${k?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${k.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${k.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ce(p)}(quantized_data - zero_point) * scale;
        ${$.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((b,_)=>_!==1).map(b=>b.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(b,_)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:g}},Rh=(e,t)=>{let r=e.inputs;Il(r,t),e.compute(El(e.inputs,t))},Mh=e=>me({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),zl,Cl,Bh,Dh,ry=L(()=>{"use strict";ne(),ae(),Ie(),se(),zl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Cl=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,a=e[1].dims,s=e[1].dataType,u=B.normalizeAxis(t.axis,n),l=r[u],p=a.slice(0),c=B.size(p),f=D("input",i,n),g=D("indicesInput",s,a.length),b=X("output",i,p.length),_=[{type:12,data:c},{type:6,data:l},{type:12,data:u}];return _.push(...J(r,a,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:_}),getShaderSource:v=>`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,g,b)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${b.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${b.setByOffset("global_idx","value")};
  }`}},Bh=e=>me({axis:e.axis}),Dh=(e,t)=>{let r=e.inputs;zl(r),e.compute(Cl(e.inputs,t))}}),Al,Ol,Nh,Uh,iy=L(()=>{"use strict";ne(),ae(),se(),Al=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Ol=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,a,s]=Op.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[n,a];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(a/l),c=Math.ceil(n/l),f=!0,g=B.size(u),b=[{type:12,data:f?p:g},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],_=["type","type"];e.length===3&&(b.push(...J(e[2].dims)),_.push("rank")),b.push(...J(u));let v=k=>{let $="";t.transA&&t.transB?$="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?$="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?$="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&($="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let E=t.alpha===1?"":"value *= uniforms.alpha;",I=D("a",e[0].dataType,e[0].dims),C=D("b",e[1].dataType,e[1].dims),A=I.type.value,R=null,x=[I,C];e.length===3&&(R=D("c",e[2].dataType,e[2].dims.length),x.push(R));let U=X("output",e[0].dataType,u.length);x.push(U);let V=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${k.registerUniforms(V).declareVariables(...x)}

  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${A}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${$}
    }

    ${E}
    ${R!=null?`let cOffset = ${R.broadcastedIndicesToOffset("vec2(m, n)",U)}; value += ${A}(uniforms.beta) * ${R.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},T=k=>{let $=D("a",e[0].dataType,e[0].dims),E=D("b",e[1].dataType,e[1].dims),I=null,C=[$,E];e.length===3&&(I=D("c",e[2].dataType,e[2].dims.length),C.push(I));let A=X("output",e[0].dataType,u.length);C.push(A);let R=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],x="",U="";t.transA&&t.transB?(U=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(U=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,x="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(U=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(U=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${E.type.value}(0);
      }
      `,x="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let V=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${k.registerUniforms(R).declareVariables(...C)}
  var<workgroup> tile_a: array<array<${$.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${E.type.storage}, ${l}>, ${l}>;
  ${k.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${A.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${U}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${x}
      }
      workgroupBarrier();
    }

    ${V}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${I!=null?`let cOffset = ${I.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${A.type.value}(uniforms.beta) * ${I.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:p*c},programUniforms:b}),getShaderSource:T}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:b}),getShaderSource:v}},Nh=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Uh=(e,t)=>{Al(e.inputs),e.compute(Ol(e.inputs,t))}}),tt,st,zt,Ct,Rl,Ml,Bl,Dl,Nl,Ul,Pl,ql,Ph,qh,ny=L(()=>{"use strict";ne(),ae(),Ie(),se(),[tt,st,zt,Ct]=[0,1,2,3],Rl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Ml=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Bl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Dl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Nl=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Ul=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${tt}] = batch;
     indices[${st}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${zt}] = u32(r);
            indices[${Ct}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${zt}] = u32(clamp(r, 0, H - 1));
          indices[${Ct}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${zt}] = gs_reflect(r, border[1], border[3]);
          indices[${Ct}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Pl=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${tt}], indices[${st}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${tt}], indices[${st}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${tt}], indices[${st}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${tt}], indices[${st}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${tt}], indices[${st}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${tt}], indices[${st}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,ql=(e,t)=>{let r=D("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=D("grid",e[1].dataType,i.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[tt,st,zt,Ct]=[0,3,1,2]);let s=X("output",e[0].dataType,a.length),u=r.type.value,l=B.size(a),p=[{type:12,data:l},...J(e[0].dims,i,a)],c=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,n,s)}
  ${Ml}
  ${Bl(u)}
  ${Dl(t)}
  ${Nl(t)}
  ${Ul(r,u,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${zt}]);
      let W_in = i32(uniforms.x_shape[${Ct}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${tt}], indices[${zt}], indices[${Ct}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Pl(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let g=B.size(a);return{outputs:[{dims:a,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:p}},getShaderSource:c}},Ph=(e,t)=>{Rl(e.inputs),e.compute(ql(e.inputs,t))},qh=e=>me({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Be,Ll,Lh,pn,Wl,fr,Wh,Vh=L(()=>{"use strict";ne(),ae(),Ie(),ra(),aa(),se(),vt(),Be=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Ll=(e,t)=>{let r=e[0],i=Be(e,1),n=Be(e,2),a=Be(e,3),s=Be(e,4),u=Be(e,5),l=Be(e,6),p=Be(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],f=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],b=f,_=0,v=0,T=Math.floor(g/t.numHeads);if(l&&p&&B.size(l.dims)&&B.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==T)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==c||p.dims[1]!==t.numHeads||p.dims[3]!==T)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=l.dims[2],v=l.dims[2]}else if(l&&B.size(l.dims)||p&&B.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let k;if(i&&B.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');k=2,b=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==T)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');k=5,b=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==T)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');k=0,b=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');k=3}if(a&&B.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let $=_+b,E=0;if(s&&B.size(s.dims)>0){E=8;let R=s.dims;throw R.length===1?R[0]===c?E=1:R[0]===3*c+2&&(E=3):R.length===2&&R[0]===c&&R[1]===$&&(E=5),E===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let I=!1,C=g;if(n&&B.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(b!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=n.dims[2]}else{if(b!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');C=n.dims[1]*n.dims[3],I=!0}}let A=!1;if(s&&B.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&B.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[2]!==f||u.dims[3]!==$)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:f,pastSequenceLength:_,kvSequenceLength:b,totalSequenceLength:$,maxSequenceLength:v,inputHiddenSize:0,hiddenSize:g,vHiddenSize:C,headSize:T,vHeadSize:Math.floor(C/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:E,scale:t.scale,broadcastResPosBias:A,passPastInKv:I,qkvFormat:k}},Lh=e=>me({...e}),pn=me({perm:[0,2,1,3]}),Wl=(e,t,r,i,n,a,s)=>{let u=[i,n,a],l=B.size(u),p=[{type:12,data:l},{type:12,data:s},{type:12,data:a}],c=f=>{let g=X("qkv_with_bias",t.dataType,u),b=D("qkv",t.dataType,u),_=D("bias",r.dataType,u),v=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(v).declareVariables(b,_,g)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},fr=(e,t,r,i,n,a,s,u)=>{let l=a;if(s&&B.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Wl(e,a,s,t,i,r*n,u),l=l.reshape([t,i,r,n]),r===1||i===1?l:e.compute(qe(l,pn.perm),{inputs:[l],outputs:[-1]})[0]}else return a.dims.length===3&&(l=a.reshape([t,i,r,n])),r===1||i===1?l:e.compute(qe(l,pn.perm),{inputs:[l],outputs:[-1]})[0]},Wh=(e,t)=>{let r=Ll(e.inputs,t),i=e.inputs[0],n=Be(e.inputs,1),a=Be(e.inputs,2),s=Be(e.inputs,3),u=Be(e.inputs,4),l=Be(e.inputs,5),p=Be(e.inputs,6),c=Be(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let f=n&&a&&n.dims.length===4&&a.dims.length===4,g=fr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(f)return yr(e,g,n,a,u,void 0,p,c,l,r);if(!n||!a)throw new Error("key and value must be provided");let b=fr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,s,r.hiddenSize),_=fr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);yr(e,g,b,_,u,void 0,p,c,l,r)}}),Vl,Gl,Hl,Fl,Wn,Gh,Hh,Fh=L(()=>{"use strict";ne(),ae(),Ie(),se(),Vl=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Gl=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),me({numOutputs:i,axis:t.axis,splitSizes:r})},Hl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Q("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Fl=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Wn=(e,t)=>{let r=e[0].dims,i=B.size(r),n=e[0].dataType,a=B.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=D("input",n,r.length),l=new Array(t.numOutputs),p=[],c=[],f=0,g=[{type:12,data:i}];for(let _=0;_<t.numOutputs;_++){f+=t.splitSizes[_],l[_]=f;let v=r.slice();v[a]=t.splitSizes[_],c.push(v),s[_]=X(`output${_}`,n,v.length),p.push({dims:c[_],dataType:e[0].dataType})}g.push({type:12,data:l},...J(r,...c));let b=_=>`
  ${_.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${Hl(l.length)}
  ${Fl(s)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Q("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:g})}},Gh=(e,t)=>{Vl(e.inputs);let r=e.inputs.length===1?t:Gl(e.inputs,t);e.compute(Wn(e.inputs,r),{inputs:[0]})},Hh=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes length must be equal");return me({axis:t,numOutputs:i,splitSizes:r})}}),jl,Jr,jh,Kh=L(()=>{"use strict";ne(),ae(),Ie(),se(),jl=(e,t)=>{let[r,i,n,a]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!B.areEqual(i.dims,[])&&!B.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!B.areEqual(n.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],p=r.dims[r.dims.length-2],c=n.dims[0],f=B.sizeFromDimension(r.dims,1)/p,g=u===0?n.dims[1]*2:f/s;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(p!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(p>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(g/2!==n.dims[1]&&u/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`)},Jr=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:a}=t,s=e[0].dims[0],u=B.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=u/l,c=e[2].dims[1],f=n===0?c*2:p/i,g=new Array(s,l,p/f,f-c),b=B.computeStrides(g),_=[{type:1,data:a},{type:12,data:g},{type:12,data:b},...e[0].dims.length===3?new Array({type:12,data:[u,p,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,f,l*f,1]}):[],...J(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],v=T=>{let k=D("input",e[0].dataType,e[0].dims.length),$=D("position_ids",e[1].dataType,e[1].dims.length),E=D("cos_cache",e[2].dataType,e[2].dims.length),I=D("sin_cache",e[3].dataType,e[3].dims.length),C=X("output",e[0].dataType,e[0].dims.length);return T.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:b.length},{name:"input_output_strides",type:"u32",length:b.length}]),`
        ${T.declareVariables(k,$,E,I,C)}

        ${T.mainStart(Zt)}
          let half_rotary_emb_dim = uniforms.${E.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${$.broadcastedIndicesToOffset("bsnh.xy",X("",$.type.tensor,2))};
            let position_id =
                u32(${$.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${k.getByOffset("i")} * ${E.get("position_id","bsnh[3]")} -
                ${k.getByOffset("j")} * ${I.get("position_id","bsnh[3]")};
            ${C.setByOffset("i","re")}
            let im = ${k.getByOffset("i")} * ${I.get("position_id","bsnh[3]")} +
                ${k.getByOffset("j")} * ${E.get("position_id","bsnh[3]")};
            ${C.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${C.setByOffset("k",k.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:me({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(g)/Zt)},programUniforms:_})}},jh=(e,t)=>{jl(e.inputs,t),e.compute(Jr(e.inputs,t))}}),Kl,Zl,cn,Xl,Zh,ay=L(()=>{"use strict";Ie(),ne(),aa(),Vh(),Fh(),vt(),Kh(),se(),Kl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],p=r.dims[1],c=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=p,g=0,b=!i||i.dims.length===0,_=Math.floor(b?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);b&&(c=_*t.numHeads);let v=a&&a.dims.length!==0,T=s&&s.dims.length!==0;if(v&&a.dims.length===4&&a.dims[0]===l&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===_)throw new Error("BSNH pastKey/pastValue is not supported");if(v&&T){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=a.dims[2]}else if(v||T)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let k=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');k=3}let $=0,E=!1,I=t.kvNumHeads?_*t.kvNumHeads:c;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(f!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');I=n.dims[2]}else{if(f!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');I=n.dims[1]*n.dims[3],E=!0}}let C=e.length>4?e[5]:void 0;if(C){if(C.dims.length===0)throw new Error("seqlens_k must be at least 1D, got scalar.");let A=C.dims.reduce((R,x)=>R*x,1);if(A!==l)throw new Error(`seqlens_k must have batch_size (${l}) elements, got ${A}.`);for(let R=0;R<C.dims.length;R++)if(C.dims[R]!==1&&C.dims[R]!==l)throw new Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${l}), got dims[${R}] = ${C.dims[R]}.`)}return{batchSize:l,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:I,headSize:_,vHeadSize:Math.floor(I/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:E,qkvFormat:k}},Zl=me({perm:[0,2,1,3]}),cn=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(qe(i,Zl.perm),{inputs:[i],outputs:[-1]})[0]),i},Xl=(e,t,r,i)=>{let n=7,a=["type","type"],s=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],p=c=>{let f=D("seq_lens",r.dataType,r.dims),g=D("total_seq_lens",i.dataType,i.dims),b=X("pos_ids",n,s),_=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(_).declareVariables(f,g,b)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${b.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${b.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${b.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:p}},Zh=(e,t)=>{if(e.inputs.length>14&&e.inputs[14]||e.inputs.length>15&&e.inputs[15])throw new Error("GroupQueryAttention (JSEP): q_norm_weight / k_norm_weight inputs are not supported. The per-head Q/K RMS normalization prologue is implemented only on the CUDA and native WebGPU EPs.");let r=Kl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=me({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[g,b,_]=!n&&!a?e.compute(Wn([i],f),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,a],v,T;if(t.doRotary){let I=e.compute(Xl(r.batchSize,r.sequenceLength,l,p),{inputs:[l,p],outputs:[-1]})[0],C=e.inputs[7],A=e.inputs[8],R=me({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),x=[g,I,C,A],U=[-1];v=e.compute(Jr(x,R),{inputs:x,outputs:U})[0],x.splice(0,1,b);let V=me({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});T=e.compute(Jr(x,V),{inputs:x,outputs:U})[0]}let k=fr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?v:g,void 0,0),$=cn(e,t.doRotary?T:b,r),E=cn(e,_,r);yr(e,k,$,E,void 0,void 0,s,u,void 0,r,l,p)}}),hn,Ql,Yl,Xh,sy=L(()=>{"use strict";ne(),ae(),vt(),se(),hn=(e,t,r,i,n,a,s,u)=>{let l=Te(a),p=l===1?"f32":`vec${l}f`,c=l===1?"vec2f":`mat2x${l}f`,f=n*s,g=64;f===1&&(g=256);let b=[n,s,a/l],_=[n,s,2],v=["rank","type","type"],T=[];T.push(...J(b,_));let k=$=>{let E=D("x",t.dataType,3,l),I=D("scale",r.dataType,r.dims),C=D("bias",i.dataType,i.dims),A=X("output",1,3,2),R=[E,I,C,A];return`
  var<workgroup> workgroup_shared : array<${c}, ${g}>;
  const workgroup_size = ${g}u;
  ${$.declareVariables(...R)}
  ${$.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${E.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${$t("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${$t("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${g}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:_,dataType:1}],dispatchGroup:{x:f},programUniforms:T}),getShaderSource:k},{inputs:[t,r,i],outputs:[-1]})[0]},Ql=(e,t,r)=>{let i=t[0].dims,n=i,a=2,s=i[0],u=i[1],l=B.sizeFromDimension(i,a),p=Te(l),c=B.size(n)/p,f=hn(e,t[0],t[1],t[2],s,l,u,r.epsilon),g=[s,u,l/p],b=[s,u],_=["type","none"],v=T=>{let k=D("x",t[0].dataType,g.length,p),$=D("scale_shift",1,b.length,2),E=X("output",t[0].dataType,g.length,p),I=[k,$,E];return`
  ${T.registerUniform("output_size","u32").declareVariables(...I)}
  ${T.mainStart()}
  ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${E.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${$.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${k.getByOffset("global_idx")} * ${E.type.value}(scale_shift.x) + ${E.type.value}(scale_shift.y);
      ${E.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...J(g,b,g)]}),getShaderSource:v},{inputs:[t[0],f]})},Yl=(e,t,r)=>{let i=t[0].dims,n=i,a=i[0],s=i[i.length-1],u=B.sizeFromDimension(i,1)/s,l=Te(s),p=B.size(n)/l,c=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],f=["type","type"],g=!1,b=[0,i.length-1];for(let k=0;k<i.length-2;k++)g=g||i[k+1]!==1,b.push(k+1);g=g&&i[i.length-1]!==1;let _=g?e.compute(qe(e.inputs[0],b),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(k,$)=>i[b[$]])),v=hn(e,_,t[1],t[2],a,u,s,r.epsilon),T=k=>{let $=Ae(t[0].dataType),E=l===1?"vec2f":`mat${l}x2f`,I=R=>{let x=R===0?"x":"y",U=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${$}(${U}(scale.${x}))`;case 2:return`vec2<${$}>(${U}(scale[0].${x}, scale[1].${x}))`;case 4:return`vec4<${$}>(${U}(scale[0].${x}, scale[1].${x}, scale[2].${x}, scale[3].${x}))`;default:throw new Error(`Not supported compoents ${l}`)}},C=D("input",t[0].dataType,t[0].dims,l),A=X("output",t[0].dataType,n,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${C.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${E}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${A.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${k.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${I(0)}, ${I(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:T},{inputs:[t[0],v]})},Xh=(e,t)=>{t.format==="NHWC"?Yl(e,e.inputs,t):Ql(e,e.inputs,t)}}),Jl,ed,Qh,oy=L(()=>{"use strict";ne(),ae(),se(),Jl=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},ed=(e,t,r)=>{let i=t.simplified,n=e[0].dims,a=e[1],s=!i&&e[2],u=n,l=B.normalizeAxis(t.axis,n.length),p=B.sizeToDimension(n,l),c=B.sizeFromDimension(n,l),f=B.size(a.dims),g=s?B.size(s.dims):0;if(f!==c||s&&g!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${g}`);let b=[];for(let C=0;C<n.length;++C)C<l?b.push(n[C]):b.push(1);let _=Te(c),v=["type","type"],T=[{type:12,data:p},{type:1,data:c},{type:12,data:Math.floor(c/_)},{type:1,data:t.epsilon}];s&&v.push("type");let k=r>1,$=r>2,E=C=>{let A=Ae(e[0].dataType),R=[D("x",e[0].dataType,e[0].dims,_),D("scale",a.dataType,a.dims,_)];s&&R.push(D("bias",s.dataType,s.dims,_)),R.push(X("output",e[0].dataType,u,_)),k&&R.push(X("mean_data_output",1,b)),$&&R.push(X("inv_std_output",1,b));let x=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${C.registerUniforms(x).declareVariables(...R)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Rn("f32",_)};
    var mean_square_vector = ${Rn("f32",_)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${jt(A,_,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${$t("mean_vector",_)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${$t("mean_square_vector",_)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${jt(A,_,"x[j + offset]")};
      let f32scale = ${jt(A,_,"scale[j]")};
      output[j + offset] = ${R[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${jt(A,_,"bias[j]")}`:""}
      );
    }

    ${k?"mean_data_output[global_idx] = mean":""};
    ${$?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},I=[{dims:u,dataType:e[0].dataType}];return k&&I.push({dims:b,dataType:1}),$&&I.push({dims:b,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${_};${r};${i}`,inputDependencies:v},getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:T}),getShaderSource:E}},Qh=(e,t)=>{Jl(e.inputs),e.compute(ed(e.inputs,t,e.outputCount))}}),td,Yh,uy=L(()=>{"use strict";ae(),da(),pa(),td=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Yh=e=>{td(e.inputs);let t=Kt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(la(e.inputs,{activation:""},t));else{let n=t[t.length-2],a=B.size(e.inputs[0].dims.slice(0,-2)),s=B.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&n===1&&s===1){let u=e.inputs[0].reshape([1,a,i]),l=e.inputs[1].reshape([1,i,r]),p=[1,a,r],c=[u,l];e.compute(Yr(c,{activation:""},t,p),{inputs:c})}else e.compute(Yr(e.inputs,{activation:""},t))}}}),rd,id,nd,Jh,ef,ly=L(()=>{"use strict";ne(),ae(),Ie(),se(),rd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!B.areEqual(s.dims,[t.n,n,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(B.size(u)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,p=t.n*(t.bits===8?n:Math.floor((n*t.bits+7)/8));if(B.size(l)!==p)throw new Error("zeroPoints input size error.")}},id=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,u=r.slice(0,i-2),l=B.size(u),p=e[1].dims[2]/4,c=e[0].dataType,f=Te(t.k),g=Te(p),b=Te(s),_=u.concat([n,s]),v=n>1&&s/b%2===0?2:1,T=B.size(_)/b/v,k=64,$=[],E=[l,n,a/f],I=B.convertShape(e[1].dims).slice();I.splice(-1,1,p/g),$.push(...J(E)),$.push(...J(I)),$.push(...J(e[2].dims)),e.length===4&&$.push(...J(B.convertShape(e[3].dims)));let C=[l,n,s/b];$.push(...J(C));let A=R=>{let x=E.length,U=D("a",e[0].dataType,x,f),V=D("b",12,I.length,g),H=D("scales",e[2].dataType,e[2].dims.length),W=[U,V,H],F=e.length===4?D("zero_points",12,e[3].dims.length):void 0;F&&W.push(F);let re=C.length,O=X("output",e[0].dataType,re,b),q=Ae(e[0].dataType),ee=(()=>{switch(f){case 1:return`array<${q}, 8>`;case 2:return`mat4x2<${q}>`;case 4:return`mat2x4<${q}>`;default:throw new Error(`${f}-component is not supported.`)}})(),te=Math.floor(32/t.bits),Y=Math.floor(te/8),oe=()=>{let K="";for(let Z=0;Z<Y;Z++){let _e=Z*t.bits*4,Ee=_e+t.bits;K+=`
          // reuse a data (pass ${Z})
            var input_offset${Z>0?Z:""} = ${Z===0?U.indicesToOffset(`${U.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${Z>0?Z:""}: ${ee};
            for (var j${Z>0?Z:""}: u32 = 0; j${Z>0?Z:""} < ${8/f}; j${Z>0?Z:""}++) {
              a_data${Z>0?Z:""}[j${Z>0?Z:""}] = ${U.getByOffset(`input_offset${Z>0?Z:""}`)};
              input_offset${Z>0?Z:""}++;
            }
          `;for(let ve=0;ve<b*v;ve++)K+=`
            b_value = ${g===1?`b${ve}_data`:`b${ve}_data[i]`};
            ${t.bits===2?`{
              let half_word = b_value >> ${Z*16}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${_e}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${Ee}u) & b_mask);`}
            b_quantized_values = ${ee}(${Array.from({length:4},(Oe,ye)=>`${q}(b_value_lower[${ye}]), ${q}(b_value_upper[${ye}])`).join(", ")});
            b_dequantized_values = ${f===1?`${ee}(${Array.from({length:8},(Oe,ye)=>`(b_quantized_values[${ye}] - ${F?`zero_point${ve}`:"zero_point"}) * scale${ve}`).join(", ")});`:`(b_quantized_values - ${ee}(${Array(8).fill(`${F?`zero_point${ve}`:"zero_point"}`).join(",")})) * scale${ve};`};
            workgroup_shared[local_id.x * ${v} + ${Math.floor(ve/b)}]${b>1?`[${ve%b}]`:""} += ${Array.from({length:8/f},(Oe,ye)=>`${f===1?`a_data${Z>0?Z:""}[${ye}] * b_dequantized_values[${ye}]`:`dot(a_data${Z>0?Z:""}[${ye}], b_dequantized_values[${ye}])`}`).join(" + ")};
          `}return K},P=()=>{let K=`
            var col_index = col * ${b};
            ${F?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${q}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            `;for(let Z=0;Z<b*v;Z++)K+=`
            let scale${Z} = ${H.getByOffset("col_index * nBlocksPerCol + block")};
            ${F?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            zero_point_word = ${F.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${Z} = ${q}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return K},ie=()=>{let K=`col_index = col * ${b};`;for(let Z=0;Z<b*v;Z++)K+=`
            let b${Z}_data = ${V.getByIndices(`${V.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return K+=`
            var b_value: u32;
            let b_mask: u32 = ${t.bits===2?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${ee};
            var b_dequantized_values: ${ee};`,K};return`
        var<workgroup> workgroup_shared: array<${O.type.value}, ${v*k}>;
        ${R.declareVariables(...W,O)}
        ${R.mainStart([k,1,1])}
          let output_indices = ${O.offsetToIndices(`(global_idx / ${k}) * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${k}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${P()}
            for (var word: u32 = 0; word < ${p}; word += ${g}) {
              ${ie()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${oe()}
                word_offset += ${te/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${v}) {
            var output_value: ${O.type.value} = ${O.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${k}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${v};
            }
            ${O.setByIndices(`${O.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${g};${b};${v};${k}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:c}],dispatchGroup:{x:T},programUniforms:$}),getShaderSource:A}},nd=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,u=r.slice(0,i-2),l=B.size(u),p=e[1].dims[2]/4,c=e[0].dataType,f=Te(t.k),g=Te(p),b=u.concat([n,s]),_=128,v=s%8===0?8:s%4===0?4:1,T=_/v,k=Math.floor(32/t.bits),$=T*g*k,E=$/f,I=$/t.blockSize,C=B.size(b)/v,A=[],R=[l,n,a/f],x=B.convertShape(e[1].dims).slice();x.splice(-1,1,p/g),A.push(...J(R)),A.push(...J(x)),A.push(...J(e[2].dims)),e.length===4&&A.push(...J(B.convertShape(e[3].dims)));let U=[l,n,s];A.push(...J(U));let V=H=>{let W=R.length,F=D("a",e[0].dataType,W,f),re=D("b",12,x.length,g),O=D("scales",e[2].dataType,e[2].dims.length),q=[F,re,O],ee=e.length===4?D("zero_points",12,e[3].dims.length):void 0;ee&&q.push(ee);let te=U.length,Y=X("output",e[0].dataType,te),oe=Ae(e[0].dataType),P=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${oe}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${oe}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${oe}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${oe}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${F.type.value}, ${E}>;
        var<workgroup> inter_results: array<array<${Y.type.value}, ${T}>, ${v}>;
        ${H.declareVariables(...q,Y)}
        ${H.mainStart([T,v,1])}
          let output_indices = ${Y.offsetToIndices(`workgroup_index * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${I} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${E};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${E}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${F.getByIndices(`${F.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${F.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${I} + local_id.x;
            ${ee?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/t.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${t.bits}u);
            let zero_point_word = ${ee.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${oe}((zero_point_word) & ${t.bits===2?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,t.bits-1)} for unsigned ${t.bits}-bit quantization.
            let zero_point = ${oe}(${Math.pow(2,t.bits-1).toFixed(1)});`}
            let scale = ${O.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${re.getByIndices(`${re.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${g}; i++) {
              let b_value = ${g===1?"b_data":"b_data[i]"};
              ${(()=>{let ie=Math.floor(k/8),K="";for(let Z=0;Z<ie;Z++){let _e=Z*t.bits*4,Ee=_e+t.bits;K+=`
              ${P()}
              {${t.bits===2?`
                let half_word = b_value >> ${Z*16}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${_e}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${Ee}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${oe}>(${Array.from({length:4},(ve,Oe)=>`${oe}(b_value_lower[${Oe}]), ${oe}(b_value_upper[${Oe}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${oe}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(ve,Oe)=>`${`dot(a_data${Oe}, b_dequantized_values[${Oe}])`}`).join(" + ")};
              }
              word_offset += ${8/f};`}return K})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${v}) {
            var output_value: ${Y.type.value} = ${Y.type.value}(0);
            for (var b = 0u; b < ${T}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Y.setByIndices(`${Y.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${g};${T};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:c}],dispatchGroup:{x:C},programUniforms:A}),getShaderSource:V}},Jh=(e,t)=>{rd(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(nd(e.inputs,t)):e.compute(id(e.inputs,t))},ef=e=>me(e)}),ad,sd,od,ud,ld,dd,pd,cd,tf,dy=L(()=>{"use strict";ne(),ae(),se(),ad=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},sd=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
            k = i32(${e.indicesGet("indices",n)}) - ${Q("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Q("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${Q("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},od=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${Q("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Q("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Q("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Q("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},ud=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${Q("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Q("uniforms.x_shape",n,t)})) {
                  k = i32(${Q("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${Q("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},ld=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${Q("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${Q("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${Q("uniforms.x_shape",n,t)})) {
                  k -= i32(${Q("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${Q("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},dd=(e,t,r)=>{switch(r.mode){case 0:return sd(e,t,r.pads.length);case 1:return od(e,t,r.pads.length);case 2:return ud(e,t,r.pads.length);case 3:return ld(e,t,r.pads.length);default:throw new Error("Invalid mode")}},pd=(e,t)=>{let r=B.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=B.size(r),a=[{type:12,data:n},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...J(e[0].dims,r));let u=["rank"],l=p=>{let c=X("output",e[0].dataType,r.length),f=D("x",e[0].dataType,i.length),g=f.type.value,b=dd(c,i.length,t),_=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&_.push({name:"constant_value",type:s?g:"f32"}),`
            ${p.registerUniforms(_).declareVariables(f,c)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${b}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(B.size(r)/64)},programUniforms:a}),getShaderSource:l}},cd=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,a=new Int32Array(2*n).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)a[Number(u[l])]=Number(r[l]),a[Number(u[l])+n]=Number(r[l+u.length])}else r.forEach((u,l)=>a[Number(l)]=Number(u));let s=[];return a.forEach(u=>s.push(u)),{mode:t.mode,value:i,pads:s}}else return t},tf=(e,t)=>{ad(e.inputs);let r=cd(e.inputs,t);e.compute(pd(e.inputs,r),{inputs:[0]})}}),ur,fn,mn,gn,yn,hd,fd,_n,bn,rf,nf,wn,af,sf,$n,of,uf,lf,df,py=L(()=>{"use strict";Ve(),ne(),ae(),se(),ur=e=>{if(be.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},fn=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=a?t.dilations.slice():[],p=t.pads.slice();Xr.adjustPoolAttributes(r,n,s,u,l,p);let c=Xr.computePoolOutputShape(r,n,u,l,s,p,t.autoPad,t.ceilMode),f=Object.assign({},t);a?Object.assign(f,{kernelShape:s,strides:u,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:s,strides:u,pads:p,cacheKey:t.cacheKey});let g=c.slice();return g.push(g.splice(1,1)[0]),[f,i?g:c]},mn=(e,t)=>{let r=t.format==="NHWC",i=B.size(e),n=B.size(t.kernelShape),a=[{type:12,data:i},{type:12,data:n}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],f=!!(p+c);a.push({type:12,data:u},{type:12,data:l},{type:12,data:p},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let b=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],v=t.pads[t.pads.length/2-2],T=t.pads[t.pads.length-2];g=!!(v+T),a.push({type:12,data:b},{type:12,data:_},{type:12,data:v},{type:12,data:T}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,f,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=B.computeStrides(t.kernelShape);a.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,c)=>p+c);return[a,s,!!l,!1,!1]}},gn=(e,t,r,i,n,a,s,u,l,p,c,f)=>{let g=n.format==="NHWC",b=t.type.value,_=X("output",t.type.tensor,i);if(n.kernelShape.length<=2){let v="",T="",k="",$=r-(g?2:1);if(c?v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${$}] < 0 || xIndices[${$}]
                      >= uniforms.x_shape[${$}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,n.kernelShape.length===2){let E=r-(g?3:2);f?T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${E}] = indices[${E}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${E}] < 0 || xIndices[${E}] >= uniforms.x_shape[${E}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:T=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${E}] = indices[${E}] * uniforms.sh - uniforms.phStart + j;
                `,k=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${b}(${u});
              var pad = 0;
              ${T}
              ${v}
              ${k}
              ${s}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let v=n.kernelShape.length,T=n.pads.length,k="";return p?k=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:k=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(l).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${v}>;

              var value = ${b}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${v-1}u; j++) {
                  offsets[j] = offset / ${Q("uniforms.kernelStrides","j",v)};
                  offset -= offsets[j] * ${Q("uniforms.kernelStrides","j",v)};
                }
                offsets[${v-1}] = offset;

                isPad = false;
                for (var j = ${r-v}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${Q("uniforms.strides",`j - ${r-v}u`,v)}
                    + offsets[j - ${r-v}u] - ${Q("uniforms.pads","j - 2u",T)};
                  ${k}
              }
              ${s}

              output[global_idx] = value;
            }`}},yn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,hd=e=>`${yn(e)};${e.countIncludePad}`,fd=e=>`${yn(e)};${e.storageOrder};${e.dilations}`,_n=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),bn=(e,t,r,i)=>{let[n,a]=fn(t,i,r),s=D("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",p="";n.countIncludePad?p+=`value /= ${u}(uniforms.kernelSize);`:p+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[c,f,g,b,_]=mn(a,n);c.push(...J(t.dims,a));let v=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${g};${b};${_}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(a)/64)},programUniforms:c}),getShaderSource:T=>gn(T,s,t.dims.length,a.length,n,l,p,0,f,g,b,_)}},rf=e=>{let t=e.count_include_pad!==0,r=_n(e);if(r.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding/divisor) is not yet implemented in the WebGPU AveragePool kernel");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:hd(i)}},nf=(e,t)=>{ur(e.inputs),e.compute(bn("AveragePool",e.inputs[0],!1,t))},wn={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},af=e=>{let t=e.format;return{format:t,...wn,cacheKey:t}},sf=(e,t)=>{ur(e.inputs),e.compute(bn("GlobalAveragePool",e.inputs[0],!0,t))},$n=(e,t,r,i)=>{let[n,a]=fn(t,i,r),s=`
      value = max(x_val, value);
    `,u="",l=D("x",t.dataType,t.dims.length),p=["rank"],[c,f,g,b,_]=mn(a,n);return c.push(...J(t.dims,a)),{name:e,shaderCache:{hint:`${i.cacheKey};${g};${b};${_}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(B.size(a)/64)},programUniforms:c}),getShaderSource:v=>gn(v,l,t.dims.length,a.length,n,s,u,t.dataType===10?-65504:-1e5,f,g,b,_)}},of=(e,t)=>{ur(e.inputs),e.compute($n("MaxPool",e.inputs[0],!1,t))},uf=e=>{let t=e.storage_order,r=e.dilations,i=_n(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("ceil_mode output-shape is computed, but ceil_mode kernel execution (padding) is not yet implemented in the WebGPU MaxPool kernel");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:fd(n)}},lf=e=>{let t=e.format;return{format:t,...wn,cacheKey:t}},df=(e,t)=>{ur(e.inputs),e.compute($n("GlobalMaxPool",e.inputs[0],!0,t))}}),md,gd,pf,cf,cy=L(()=>{"use strict";ne(),ae(),Ie(),se(),md=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,a)=>a===t.axis||n===e[0].dims[a]).reduce((n,a)=>n&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},gd=(e,t)=>{let r=B.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,a=e[0].dims,s=e[1].dataType,u=B.size(a),l=i===3||i===2,p=l?[Math.ceil(B.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,f=e.length>2?e[2]:void 0,g=f?l?[Math.ceil(B.size(f.dims)/4)]:f.dims:void 0,b=c.length===0||c.length===1&&c[0]===1,_=b===!1&&c.length===1,v=Te(u),T=b&&(!l||v===4),k=T?v:1,$=T&&!l?v:1,E=D("input",l?12:i,p.length,$),I=D("scale",s,c.length),C=f?D("zero_point",l?12:i,g.length):void 0,A=X("output",s,a.length,k),R=[E,I];C&&R.push(C);let x=[p,c];f&&x.push(g);let U=[{type:12,data:u/k},{type:12,data:r},{type:12,data:t.blockSize},...J(...x,a)],V=H=>{let W=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${H.registerUniforms(W).declareVariables(...R,A)}
      ${H.mainStart()}
          ${H.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${A.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${E.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${k===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${E.getByOffset("global_idx")};`};

          // Set scale input
          ${b?`let scale_value= ${I.getByOffset("0")}`:_?`
            let scale_index = ${A.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${I.getByOffset("scale_index")};`:`
            var scale_indices: ${I.type.indices} = output_indices;
            let index = ${I.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${I.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${I.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${C?b?l?`
                let zero_point_input = ${C.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${C.getByOffset("0")}`:_?l?`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${C.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${C.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${I.indicesToOffset("scale_indices")};
                let zero_point_input = ${C.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${C.getByIndices("scale_indices")};`:`let zero_point_value = ${l?n?"i32":"u32":E.type.value}(0);`};
      // Compute and write output
      ${A.setByOffset("global_idx",`${A.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:C?["rank","rank","rank"]:["rank","rank"]},getShaderSource:V,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(u/k/64),y:1,z:1},programUniforms:U})}},pf=(e,t)=>{md(e.inputs,t),e.compute(gd(e.inputs,t))},cf=e=>me({axis:e.axis,blockSize:e.blockSize})}),yd,_d,hf,hy=L(()=>{"use strict";Ve(),ne(),se(),yd=(e,t,r)=>{let i=e===t,n=e<t&&r<0,a=e>t&&r>0;if(i||n||a)throw new Error("Range these inputs' contents are invalid.")},_d=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),a=[n],s=n,u=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...J(a)],l=p=>{let c=X("output",i,a.length),f=c.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${p.registerUniforms(g).declareVariables(c)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},hf=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),be.webgpu.validateInputContent&&yd(t,r,i),e.compute(_d(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),bd,wd,ff,mf,fy=L(()=>{"use strict";ne(),ae(),Ie(),se(),bd=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${n}bitcast<${i}>(oldValue) + (${r})${a}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${a}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},wd=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,a=1,s=Math.ceil(B.sizeToDimension(i,i.length-1)/a),u=i[i.length-1],l=B.sizeFromDimension(r,u),p=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...J(e[1].dims,e[2].dims,n)],c=f=>{let g=D("indices",e[1].dataType,e[1].dims.length),b=D("updates",e[2].dataType,e[2].dims.length,a),_=t.reduction!=="none"&&t.reduction!==""?Pp("output",e[0].dataType,n.length):X("output",e[0].dataType,n.length,a);return`
      ${f.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,b,_)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${bd(t.reduction,"output[data_offset + i]","value",_.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:c}},ff=e=>me({reduction:e.reduction}),mf=(e,t)=>{e.compute(wd(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),$d,vd,xd,vn,Sd,kd,Td,Id,Ed,zd,Cd,Ad,xn,Od,Rd,Md,Bd,Dd,gf,yf,my=L(()=>{"use strict";ne(),ae(),Ie(),se(),$d=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},vd=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,a)=>i[n]=e[a]),i},xd=(e,t,r,i,n,a)=>{let[s,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(c=>i.push(c)),i.length!==0&&i.length!==p&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");$d(i,t),t.axes.length>0&&vd(i,t.axes,p).forEach((c,f)=>i[f]=c)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(c=>n.push(Number(c))),n.length!==0&&n.length!==p&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},vn=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Sd=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${vn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${vn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",kd=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Td=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((a,s)=>{i[a]=n[s],i[s+r]=n[t.length+s]}),i):n},Id=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(a=>n.push(a)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((a,s)=>n[a]=r[s])}else r.forEach(a=>n.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((a,s)=>Math.round(a*t[s]))}return n},Ed=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=i),r.axes.forEach(a=>n[a]=Math.round(e[a]*t[a]))):(t.fill(i,0,t.length),n.forEach((a,s)=>n[s]=Math.round(a*t[s]))),n},zd=(e,t,r,i,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${Q("uniforms.scales","i",i)};
        var roi_low = ${Q("uniforms.roi","i",n)};
        var roi_hi = ${Q("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Q("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${Q("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Cd=(e,t,r,i,n,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Q("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Q("uniforms.roi","i",a)};
          var roi_hi = ${Q("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${Q("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${Q("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Ad=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Q("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,xn=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Od=(e,t,r,i,n)=>{let[a,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${xn(e,l,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${s}];
      var col:${p} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Rd=(e,t,r,i,n,a,s,u,l,p)=>{let c=r.length===2,f=!0,[g,b]=c?[0,1]:f?[2,3]:[1,2],_=e.type.value,v=T=>{let k=T===g?"row":"col";return`
      fn ${k}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${_} {
        var output_index = ${t.indicesGet("output_indices",T)};
        var originalIdx: ${_} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[T]},
        ${i[T]}, ${r[T]}, ${a[T]}, ${a[T]} + ${r.length});
        var fractOriginalIdx: ${_} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[T]} - 1))) {
          return ${l};
        }
        var data: array<${_}, 4> = array<${_}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${k}: ${_} = originalIdx + ${_}(i);
          if (${k} < 0 || ${k} >= ${r[T]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${k} = max(0, min(${k}, ${r[T]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",T,`u32(${k})`)};
          data[i + 1] = ${T===g?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${v(g)};
    ${v(b)};
  fn getCubicInterpolationCoefs(s: ${_}) -> array<${_}, 4> {
    var absS = abs(s);
    var coeffs: array<${_}, 4> = array<${_}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${_} = 1.0 - absS;
    var twoMinusAbsS: ${_} = 2.0 - absS;
    var onePlusAbsS: ${_} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${_}, 4>, coefs: array<${_}, 4>) -> ${_} {
    var coefsSum: ${_} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${_} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Md=(e,t,r,i,n)=>{let[a,s,u,l,p]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${xn(e,p,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Bd=(e,t,r,i,n,a)=>{let s=e.dims,u=Td(a,t.axes,s.length),l=Id(s,i,n,t.axes),p=i.slice();i.length===0&&(p=s.map(($,E)=>$===0?1:l[E]/$),t.keepAspectRatioPolicy!=="stretch"&&(l=Ed(s,p,t)));let c=X("output",e.dataType,l.length),f=D("input",e.dataType,s.length),g=B.size(l),b=s.length===l.length&&s.every(($,E)=>$===l[E]),_=t.coordinateTransformMode==="tf_crop_and_resize",v=t.extrapolationValue,T=f.type.value,k=$=>`
      ${b?"":`
      ${Sd(t.coordinateTransformMode,T)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Ad(f,s)};
              ${kd(t.nearestMode,r,T)};
              ${Cd(f,c,s,l,p.length,u.length,_)};
              `;case"linear":return`
              ${zd(c,s,l,p.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Od(f,c,s,_,v)}`;if(s.length===3||s.length===5)return`${Md(f,c,s,_,v)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Rd(f,c,s,l,p,u,t.cubicCoeffA,_,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${$.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",u.length).declareVariables(f,c)}
      ${$.mainStart()}
        ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${b?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${n.length>0?n:""}|${u.length>0?u:""}|${b}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:k,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:p},{type:1,data:u},...J(s,l)]})}},Dd=e=>{let t=e.customDataBuffer;return new Uint32Array(t.buffer,t.byteOffset,1)[0]},gf=(e,t)=>{let r=[],i=[],n=[],a=Dd(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");xd(e.inputs,t,a,r,i,n),e.compute(Bd(e.inputs[0],t,a,r,i,n),{inputs:[0]})},yf=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return me({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:p})}}),Nd,Ud,_f,gy=L(()=>{"use strict";ne(),ae(),se(),Nd=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},Ud=(e,t,r,i)=>{let n=t.simplified,a=e[0].dims,s=B.size(a),u=a,l=s,p=a.slice(-1)[0],c=i?a.slice(0,-1).concat(1):[],f=!n&&e.length>3,g=e.length>4,b=i&&r>1,_=i&&r>2,v=r>3,T=64,k=Te(p),$=[{type:12,data:l},{type:12,data:k},{type:12,data:p},{type:1,data:t.epsilon}],E=C=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],R=[D("x",e[0].dataType,e[0].dims,k),D("skip",e[1].dataType,e[1].dims,k),D("gamma",e[2].dataType,e[2].dims,k)];f&&R.push(D("beta",e[3].dataType,e[3].dims,k)),g&&R.push(D("bias",e[4].dataType,e[4].dims,k)),R.push(X("output",e[0].dataType,u,k)),b&&R.push(X("mean_output",1,c)),_&&R.push(X("inv_std_output",1,c)),v&&R.push(X("input_skip_bias_sum",e[0].dataType,u,k));let x=Ae(e[0].dataType),U=Ae(1,k);return`

      ${C.registerUniforms(A).declareVariables(...R)}
      var<workgroup> sum_shared : array<${U}, ${T}>;
      var<workgroup> sum_squared_shared : array<${U}, ${T}>;

      ${C.mainStart([T,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${T};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${T};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${T-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":x+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${v?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${jt(x,k,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${T};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${$t("sum",k)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${$t("square_sum",k)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${b?"mean_output[global_idx] = mean;":""}
        ${_?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${x}(mean)`}) *
            ${x}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},I=[{dims:u,dataType:e[0].dataType}];return r>1&&I.push({dims:c,dataType:1}),r>2&&I.push({dims:c,dataType:1}),r>3&&I.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${k};${b};${_};${v}`,inputDependencies:e.map((C,A)=>"type")},getShaderSource:E,getRunData:()=>({outputs:I,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:$})}},_f=(e,t)=>{Nd(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Ud(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Pd,lr,qd,Sn,Ld,Wd,bf,wf,yy=L(()=>{"use strict";ne(),ae(),Ie(),se(),Pd=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},lr=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},qd=(e,t)=>{if(e.length>1){let r=lr(e,1),i=lr(e,2),n=lr(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),me({starts:r,ends:i,axes:n})}else return t},Sn=(e,t,r,i,n)=>{let a=e;return e<0&&(a+=r[i[t]]),n[t]<0?Math.max(0,Math.min(a,r[i[t]]-1)):Math.max(0,Math.min(a,r[i[t]]))},Ld=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length-1}; i >= 0; i--) {
            let input_shape_i = ${Q("uniforms.input_shape","i",r.length)};
            let steps_i = ${Q("uniforms.steps","i",r.length)};
            let signs_i = ${Q("uniforms.signs","i",r.length)};
            let starts_i = ${Q("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Wd=(e,t)=>{let r=e[0].dims,i=B.size(r),n=t.axes.length>0?B.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=lr(e,4);a.forEach(k=>k!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(n.length).fill(1));let s=t.starts.map((k,$)=>Sn(k,$,r,n,a)),u=t.ends.map((k,$)=>Sn(k,$,r,n,a));if(n.length!==s.length||n.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let k=0;k<r.length;++k)n.includes(k)||(s.splice(k,0,0),u.splice(k,0,r[k]),a.splice(k,0,1));let l=a.map(k=>Math.sign(k));a.forEach((k,$,E)=>{if(k<0){let I=(u[$]-s[$])/k,C=s[$],A=C+I*a[$];s[$]=A,u[$]=C,E[$]=-k}});let p=r.slice(0);n.forEach((k,$)=>{p[k]=Math.ceil((u[k]-s[k])/a[k])});let c={dims:p,dataType:e[0].dataType},f=X("output",e[0].dataType,p.length),g=D("input",e[0].dataType,e[0].dims.length),b=B.size(p),_=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:a.length}],v=[{type:12,data:b},{type:12,data:s},{type:6,data:l},{type:12,data:a},...J(e[0].dims,p)],T=k=>`
      ${k.registerUniforms(_).declareVariables(g,f)}
        ${Ld(g,f,r)}
        ${k.mainStart()}
          ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:v})}},bf=(e,t)=>{Pd(e.inputs,t);let r=qd(e.inputs,t);e.compute(Wd(e.inputs,r),{inputs:[0]})},wf=e=>{let t=e.starts,r=e.ends,i=e.axes;return me({starts:t,ends:r,axes:i})}}),Vd,Gd,$f,vf,_y=L(()=>{"use strict";ne(),ae(),Ie(),vt(),se(),Vd=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Gd=(e,t)=>{let r=e.inputs[0],i=r.dims,n=B.size(i),a=i.length,s=B.normalizeAxis(t.axis,a),u=s<i.length-1,l,p=[];u?(p=Array.from({length:a},(R,x)=>x),p[s]=a-1,p[a-1]=s,l=e.compute(qe(r,p),{inputs:[r],outputs:[-1]})[0]):l=r;let c=l.dims,f=c[a-1],g=n/f,b=Te(f),_=f/b,v=64;g===1&&(v=256);let T=(R,x)=>x===4?`max(max(${R}.x, ${R}.y), max(${R}.z, ${R}.w))`:x===2?`max(${R}.x, ${R}.y)`:x===3?`max(max(${R}.x, ${R}.y), ${R}.z)`:R,k=D("x",l.dataType,l.dims,b),$=X("result",l.dataType,l.dims,b),E=k.type.value,I=Ae(l.dataType)==="f32"?`var threadMax = ${E}(-3.4028234663852886e+38f);`:`var threadMax = ${E}(-65504.0h);`,C=R=>`
      var<workgroup> rowMaxShared : ${E};
      var<workgroup> rowSumShared : ${E};
      var<workgroup> threadShared : array<${E}, ${v}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${E} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${E}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${R.registerUniform("packedCols","i32").declareVariables(k,$)}
      ${R.mainStart(v)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${v};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${I}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${E}(${T("threadShared[0]",b)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${E}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${E}(${$t("threadShared[0]",b)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${E}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,A=e.compute({name:"Softmax",shaderCache:{hint:`${b};${v}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:_}]}),getShaderSource:C},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(qe(A,p),{inputs:[A]})},$f=(e,t)=>{Vd(e.inputs),Gd(e,t)},vf=e=>me({axis:e.axis})}),kn,Hd,Fd,jd,xf,by=L(()=>{"use strict";ne(),ae(),se(),kn=e=>Array.from(e.getBigInt64Array(),Number),Hd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(kn(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Fd=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},jd=(e,t)=>{let r=e[0].dims,i=t??kn(e[1]),n=Fd(r,i),a=B.size(n),s=e[0].dataType,u=D("input",s,r.length),l=X("output",s,n.length),p=c=>`
      const inputShape = ${u.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(u,l)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...J(e[0].dims,n)]}),getShaderSource:p}},xf=e=>{Hd(e.inputs),e.compute(jd(e.inputs),{inputs:[0]})}}),Kd,Zd,Sf,wy=L(()=>{"use strict";ne(),ae(),se(),Kd=(e,t,r,i,n)=>{let a=X("output_data",n,r.length,4),s=D("a_data",t[1].dataType,t[1].dims.length,4),u=D("b_data",t[2].dataType,t[2].dims.length,4),l=D("c_data",t[0].dataType,t[0].dims.length,4),p,c=(f,g,b)=>`select(${g}, ${f}, ${b})`;if(!i)p=a.setByOffset("global_idx",c(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let f=(g,b,_="")=>{let v=`a_data[index_a${b}][component_a${b}]`,T=`b_data[index_b${b}][component_b${b}]`,k=`bool(c_data[index_c${b}] & (0xffu << (component_c${b} * 8)))`;return`
            let output_indices${b} = ${a.offsetToIndices(`global_idx * 4u + ${b}u`)};
            let offset_a${b} = ${s.broadcastedIndicesToOffset(`output_indices${b}`,a)};
            let offset_b${b} = ${u.broadcastedIndicesToOffset(`output_indices${b}`,a)};
            let offset_c${b} = ${l.broadcastedIndicesToOffset(`output_indices${b}`,a)};
            let index_a${b} = offset_a${b} / 4u;
            let index_b${b} = offset_b${b} / 4u;
            let index_c${b} = offset_c${b} / 4u;
            let component_a${b} = offset_a${b} % 4u;
            let component_b${b} = offset_b${b} % 4u;
            let component_c${b} = offset_c${b} % 4u;
            ${g}[${b}] = ${_}(${c(v,T,k)});
          `};n===9?p=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Zd=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,a=!(B.areEqual(t,r)&&B.areEqual(r,i)),s=t,u=B.size(t);if(a){let p=Kt.calcShape(Kt.calcShape(t,r,!1),i,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,u=B.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Kd(p,e,s,a,n),getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...J(i,t,r,s)]})}},Sf=e=>{e.compute(Zd(e.inputs))}}),kf,$y=L(()=>{"use strict";M0(),aa(),B0(),D0(),N0(),U0(),P0(),G0(),F0(),j0(),K0(),Z0(),X0(),Q0(),Y0(),J0(),ey(),ty(),ry(),iy(),ny(),ay(),sy(),oy(),uy(),ly(),Vh(),dy(),py(),cy(),hy(),fy(),na(),my(),Kh(),gy(),yy(),_y(),Fh(),by(),vt(),sa(),wy(),kf=new Map([["Abs",[fc]],["Acos",[mc]],["Acosh",[gc]],["Add",[Qc]],["ArgMax",[dc,Bn]],["ArgMin",[lc,Bn]],["Asin",[yc]],["Asinh",[_c]],["Atan",[bc]],["Atanh",[wc]],["Attention",[pc]],["AveragePool",[nf,rf]],["BatchNormalization",[cc]],["BiasAdd",[hc]],["BiasSplitGelu",[Xc]],["Cast",[vc,$c]],["Ceil",[Sc]],["Clip",[xc]],["Concat",[oh,uh]],["Conv",[Ln,qn]],["ConvTranspose",[_h,yh]],["Cos",[kc]],["Cosh",[Tc]],["CumSum",[bh,wh]],["DepthToSpace",[$h,vh]],["DequantizeLinear",[pf,cf]],["DFT",[xh,Sh]],["Div",[Yc]],["Einsum",[kh,Th]],["Elu",[Ic,hr]],["Equal",[Jc]],["Erf",[Ec]],["Exp",[zc]],["Expand",[Ih]],["FastGelu",[Eh]],["Floor",[Cc]],["FusedConv",[Ln,qn]],["Gather",[Ch,zh]],["GatherElements",[Dh,Bh]],["GatherBlockQuantized",[Rh,Mh]],["GatherND",[Ah,Oh]],["Gelu",[Ac]],["Gemm",[Uh,Nh]],["GlobalAveragePool",[sf,af]],["GlobalMaxPool",[df,lf]],["Greater",[ih]],["GreaterOrEqual",[ah]],["GridSample",[Ph,qh]],["GroupQueryAttention",[Zh]],["HardSigmoid",[Pc,Uc]],["HardSwish",[qc]],["InstanceNormalization",[Xh]],["LayerNormalization",[Qh]],["LeakyRelu",[Oc,hr]],["Less",[nh]],["LessOrEqual",[sh]],["Log",[Kc]],["MatMul",[Yh]],["MatMulNBits",[Jh,ef]],["MaxPool",[of,uf]],["Mul",[eh]],["MultiHeadAttention",[Wh,Lh]],["Neg",[Mc]],["Not",[Rc]],["Pad",[tf]],["Pow",[th]],["QuickGelu",[Zc,hr]],["Range",[hf]],["Reciprocal",[Bc]],["ReduceMin",[nc]],["ReduceMean",[Jp]],["ReduceMax",[ic]],["ReduceSum",[sc]],["ReduceProd",[ac]],["ReduceL1",[ec]],["ReduceL2",[tc]],["ReduceLogSum",[uc]],["ReduceLogSumExp",[rc]],["ReduceSumSquare",[oc]],["Relu",[Dc]],["Resize",[gf,yf]],["RotaryEmbedding",[jh]],["ScatterND",[mf,ff]],["Sigmoid",[Nc]],["Sin",[Lc]],["Sinh",[Wc]],["Slice",[bf,wf]],["SkipLayerNormalization",[_f]],["Split",[Gh,Hh]],["Sqrt",[Vc]],["Softmax",[$f,vf]],["Sub",[rh]],["Tan",[Gc]],["Tanh",[Hc]],["ThresholdedRelu",[jc,hr]],["Tile",[xf]],["Transpose",[Lp,Wp]],["Where",[Sf]]])}),Tf,vy=L(()=>{"use strict";Ve(),lt(),se(),Tf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){rt(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let p of t)u.push({binding:u.length,resource:{buffer:p.buffer}});for(let p of r)u.push({binding:u.length,resource:{buffer:p.buffer}});n&&u.push({binding:u.length,resource:n});let l=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Qe(e.programInfo.name)}dispose(){}build(e,t){rt(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{r.features.has(p.feature)&&i.push(`enable ${p.extension};`)});let n=qp(t,this.backend.device.limits),a=e.getShaderSource(n),s=`${i.join(`
`)}
${n.additionalImplementations}
${a}`,u=r.createShaderModule({code:s,label:e.name});ce("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Qe(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let a=t*r*i,s=Math.ceil(Math.sqrt(a));if(s>n){if(s=Math.ceil(Math.cbrt(a)),s>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),If={};Xt(If,{WebGpuBackend:()=>Ef});var Xd,Qd,Yd,Ef,xy=L(()=>{"use strict";Ve(),ne(),lt(),Bp(),O0(),$y(),vy(),Xd=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let a=e[i].dims.length;r.push(`${n};${a}`);break}case"dims":{let a=e[i].dims.join(",");r.push(`${n};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Qd=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Xd(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Yd=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Ef=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=u=>t.features.has(u)&&r.push(u)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i);let a=t,s=t.info??(typeof a.requestAdapterInfo=="function"?await a.requestAdapterInfo():void 0);this.adapterInfo=new Yd(s),this.gpuDataManager=Up(this),this.programManager=new Tf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,ea(e.logLevel,!!e.debug),this.device.onuncapturederror=u=>{u.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${u.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;rt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let n=r[i],a=n.kernelId,s=this.kernels.get(a),u=s.kernelType,l=s.kernelName,p=n.programName,c=n.inputTensorViews,f=n.outputTensorViews,g=t[i*2],b=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),v=Number(b-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger(v))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(T=>({dims:T.dims,dataType:ot(T.dataType)})),outputsMetadata:f.map(T=>({dims:T.dims,dataType:ot(T.dataType)})),kernelId:a,kernelType:u,kernelName:l,programName:p,startTime:_,endTime:v});else{let T="";c.forEach(($,E)=>{T+=`input[${E}]: [${$.dims}] | ${ot($.dataType)}, `});let k="";f.forEach(($,E)=>{k+=`output[${E}]: [${$.dims}] | ${ot($.dataType)}, `}),console.log(`[profiling] kernel "${a}|${u}|${l}|${p}" ${T}${k}start time: ${_} ns, execution time: ${v-_} ns`)}jr("GPU",`${p}::${g}::${b}`)}e.unmap(),this.pendingQueries.delete(e)}),Qe()}run(e,t,r,i,n,a){rt(e.name);let s=[];for(let $=0;$<t.length;++$){let E=t[$].data;if(E===0)continue;let I=this.gpuDataManager.get(E);if(!I)throw new Error(`no GPU data for input: ${E}`);s.push(I)}let{outputs:u,dispatchGroup:l,programUniforms:p}=e.getRunData(t),c=r.length===0?u.map(($,E)=>E):r;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let f=[],g=[];for(let $=0;$<u.length;++$){if(!Number.isInteger(c[$])||c[$]<-3||c[$]>=a)throw new Error(`Invalid output index: ${c[$]}`);if(c[$]===-3)continue;let E=c[$]===-1,I=c[$]===-2,C=E||I?n(u[$].dataType,u[$].dims):i(c[$],u[$].dataType,u[$].dims);if(f.push(C),C.data===0)continue;let A=this.gpuDataManager.get(C.data);if(!A)throw new Error(`no GPU data for output: ${C.data}`);if(E&&this.temporaryData.push(A),I){let R=this.kernelPersistentData.get(this.currentKernelId);R||(R=[],this.kernelPersistentData.set(this.currentKernelId,R)),R.push(A)}g.push(A)}if(s.length!==t.length||g.length!==f.length){if(g.length===0)return Qe(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let b;if(p){let $=0,E=[];p.forEach(R=>{let x=typeof R.data=="number"?[R.data]:R.data;if(x.length===0)return;let U=R.type===10?2:4,V,H;R.type===10?(H=x.length>4?16:x.length>2?8:x.length*U,V=x.length>4?16:U*x.length):(H=x.length<=2?x.length*U:16,V=16),$=Math.ceil($/H)*H,E.push($);let W=R.type===10?8:4;$+=x.length>4?Math.ceil(x.length/W)*V:x.length*U});let I=16;$=Math.ceil($/I)*I;let C=new ArrayBuffer($);p.forEach((R,x)=>{let U=E[x],V=typeof R.data=="number"?[R.data]:R.data;if(R.type===6)new Int32Array(C,U,V.length).set(V);else if(R.type===12)new Uint32Array(C,U,V.length).set(V);else if(R.type===10)new Uint16Array(C,U,V.length).set(V);else if(R.type===1)new Float32Array(C,U,V.length).set(V);else throw new Error(`Unsupported uniform type: ${ot(R.type)}`)});let A=this.gpuDataManager.create($,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(A.buffer,0,C,0,$),this.gpuDataManager.release(A.id),b={offset:0,size:$,buffer:A.buffer}}let _=this.programManager.normalizeDispatchGroupSize(l),v=_[1]===1&&_[2]===1,T=Qd(e,t,v),k=this.programManager.getArtifact(T);if(k||(k=this.programManager.build(e,_),this.programManager.setArtifact(T,k),ce("info",()=>`[artifact] key: ${T}, programName: ${e.name}`)),p&&k.uniformVariablesInfo){if(p.length!==k.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${k.uniformVariablesInfo.length}, got ${p.length} in program "${k.programInfo.name}".`);for(let $=0;$<p.length;$++){let E=p[$],I=E.type,C=typeof E.data=="number"?1:E.data.length,[A,R]=k.uniformVariablesInfo[$];if(I!==A||C!==R)throw new Error(`Uniform variable ${$} mismatch: expect type ${A} with size ${R}, got type ${I} with size ${C} in program "${k.programInfo.name}".`)}}if(ce("info",()=>`[ProgramManager] run "${e.name}" (key=${T}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let $={kernelId:this.currentKernelId,programName:k.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push($),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push($)}return this.programManager.run(k,s,g,_,b),Qe(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=kf.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,a=i.kernelName,s=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),ce("info",()=>`[WebGPU] Start to run kernel "[${n}] ${a}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(p){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${a}" failed. ${p}`)),1}finally{l&&r.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${n}] ${a}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let a=n.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,a);return n.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await On(this,e,t);return ta(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ce("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ce("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ce("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),a=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(a.computePipeline),n.setBindGroup(0,a.bindGroup),n.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),zf={};Xt(zf,{init:()=>Cf});var Wr,Jd,Cf,Sy=L(()=>{"use strict";ne(),lt(),ae(),A0(),Wr=class Af{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=B.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(B.size(t)!==B.size(this.dims))throw new Error("Invalid new shape");return new Af(this.module,this.dataType,this.data,t)}},Jd=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,a=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,a));let s=Number(e.getValue(i*n++,a));this.outputCount=Number(e.getValue(i*n++,a)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,a));let u=[];for(let l=0;l<s;l++){let p=Number(e.getValue(i*n++,a)),c=Number(e.getValue(i*n++,"*")),f=Number(e.getValue(i*n++,a)),g=[];for(let b=0;b<f;b++)g.push(Number(e.getValue(i*n++,a)));u.push(new Wr(e,p,c,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,i=t?.outputs??[],n=(s,u,l)=>new Wr(this.module,u,this.output(s,l),l),a=(s,u)=>{let l=Bt(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let p=l>0?this.backend.gpuDataManager.create(l).id:0;return new Wr(this.module,s,p,u)};return this.backend.run(e,r,i,n,a,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*i);this.module.setValue(a,t.length,n);for(let s=0;s<t.length;s++)this.module.setValue(a+i*(s+1),t[s],n);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},Cf=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(xy(),gr(If)).WebGpuBackend,s=new a;await s.initialize(r,i),n("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,l,p,c=!1)=>{if(c)ce("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(p)}`),s.memcpy(Number(u),Number(l));else{ce("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let f=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(p));s.upload(Number(l),f)}},async(u,l,p)=>{ce("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${p}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(u,l,p)=>s.createKernel(u,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>s.releaseKernel(u),(u,l,p,c)=>{ce("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${l}`);let f=new Jd(t,s,Number(l));return s.computeKernel(Number(u),f,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new Np(r);n("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,u,l,p,c)=>a.ensureTensor(s,u,l,p,c),(s,u)=>{a.uploadTensor(s,u)},async(s,u)=>a.downloadTensor(s,u),(s,u)=>a.registerMLContext(s,u),!!r.trace])}}}),ep,ca,ha,_t,tp,Tn,ei,fa,ma,In,ga,ya,_a,Of=L(()=>{"use strict";Ve(),E0(),z0(),ne(),Lt(),Xn(),Ap(),ep=(e,t)=>{$e()._OrtInit(e,t)!==0&&ge("Can't initialize onnxruntime.")},ca=async e=>{ep(e.wasm.numThreads,Zr(e.logLevel))},ha=async(e,t)=>{$e().asyncInit?.();let r=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:n}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let i=(Sy(),gr(zf)).init;t==="webgpu"&&await i("webgpu",$e(),e,r),t==="webnn"&&await i("webnn",$e(),e)}},_t=new Map,tp=e=>{let t=$e(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&ge("Can't get session input/output count.");let a=i===4?"i32":"i64";return[Number(t.getValue(n,a)),Number(t.getValue(n+i,a))]}finally{t.stackRestore(r)}},Tn=(e,t)=>{let r=$e(),i=r.stackSave(),n=0;try{let a=r.PTR_SIZE,s=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&ge("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));n=Number(r.getValue(s+a,"*"));let l=r.HEAP32[n/4];if(l===0)return[u,0];let p=r.HEAPU32[n/4+1],c=[];for(let f=0;f<p;f++){let g=Number(r.getValue(n+8+f*a,"*"));c.push(g!==0?r.UTF8ToString(g):Number(r.getValue(n+8+(f+p)*a,"*")))}return[u,l,c]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},ei=e=>{let t=$e(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},fa=async(e,t)=>{let r,i,n=$e();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=ei(e);let a=0,s=0,u=0,l=[],p=[],c=[];try{if([s,l]=await Cp(t),t?.externalData&&n.mountExternalData){let I=[];for(let C of t.externalData){let A=typeof C=="string"?C:C.path,R=typeof C=="string"?C:C.data;I.push(Jn(R).then(x=>{n.mountExternalData(A,x)}))}await Promise.all(I)}for(let I of t?.executionProviders??[])if((typeof I=="string"?I:I.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof I!="string"){let C=I,A=C?.context,R=C?.gpuDevice,x=C?.deviceType,U=C?.powerPreference;A?n.currentContext=A:R?n.currentContext=await n.webnnCreateMLContext(R):n.currentContext=await n.webnnCreateMLContext({deviceType:x,powerPreference:U})}else n.currentContext=await n.webnnCreateMLContext();break}a=await n._OrtCreateSession(r,i,s),n.webgpuOnCreateSession?.(a),a===0&&ge("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(a,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[f,g]=tp(a),b=!!t?.enableGraphCapture,_=[],v=[],T=[],k=[],$=[];for(let I=0;I<f;I++){let[C,A,R]=Tn(a,I);C===0&&ge("Can't get an input name."),p.push(C);let x=n.UTF8ToString(C);_.push(x),T.push(A===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:ot(A),shape:R})}for(let I=0;I<g;I++){let[C,A,R]=Tn(a,I+f);C===0&&ge("Can't get an output name."),c.push(C);let x=n.UTF8ToString(C);v.push(x),k.push(A===0?{name:x,isTensor:!1}:{name:x,isTensor:!0,type:ot(A),shape:R});{if(b&&t?.preferredOutputLocation===void 0){$.push("gpu-buffer");continue}let U=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[x]??"cpu",V=n.webnnIsGraphOutput;if(U==="cpu"&&V&&V(a,x)){$.push("ml-tensor-cpu-output");continue}if(U!=="cpu"&&U!=="cpu-pinned"&&U!=="gpu-buffer"&&U!=="ml-tensor")throw new Error(`Not supported preferred output location: ${U}.`);if(b&&U!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${U}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);$.push(U)}}let E=null;return $.some(I=>I==="gpu-buffer"||I==="ml-tensor"||I==="ml-tensor-cpu-output")&&(u=n._OrtCreateBinding(a),u===0&&ge("Can't create IO binding."),E={handle:u,outputPreferredLocations:$,outputPreferredLocationsEncoded:$.map(I=>I==="ml-tensor-cpu-output"?"ml-tensor":I).map(I=>An(I))}),_t.set(a,[a,p,c,E,b,!1]),[a,_,v,T,k]}catch(f){throw p.forEach(g=>n._OrtFree(g)),c.forEach(g=>n._OrtFree(g)),u!==0&&n._OrtReleaseBinding(u)!==0&&ge("Can't release IO binding."),a!==0&&n._OrtReleaseSession(a)!==0&&ge("Can't release session."),f}finally{n._free(r),s!==0&&n._OrtReleaseSessionOptions(s)!==0&&ge("Can't release session options."),l.forEach(f=>n._free(f)),n.unmountExternalData?.()}},ma=e=>{let t=$e(),r=_t.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,a,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&ge("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&ge("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),n.forEach(l=>t._OrtFree(l)),a.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&ge("Can't release session."),_t.delete(e)},In=async(e,t,r,i,n,a,s=!1)=>{if(!e){t.push(0);return}let u=$e(),l=u.PTR_SIZE,p=e[0],c=e[1],f=e[3],g=f,b,_;if(p==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let k=e[2].gpuBuffer;_=Bt(Mt(p),c);{let $=u.jsepRegisterBuffer;if(!$)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');b=$(i,a,k,_)}}else if(f==="ml-tensor"){let k=e[2].mlTensor;_=Bt(Mt(p),c);let $=u.webnnRegisterMLTensor;if(!$)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');b=$(i,k,Mt(p),c)}else{let k=e[2];if(Array.isArray(k)){_=l*k.length,b=u._malloc(_),r.push(b);for(let $=0;$<k.length;$++){if(typeof k[$]!="string")throw new TypeError(`tensor data at index ${$} is not a string`);u.setValue(b+$*l,Xe(k[$],r),"*")}}else{let $=u.webnnIsGraphInput,E=u.webnnIsGraphOutput;if(p!=="string"&&$&&E){let I=u.UTF8ToString(n);if($(i,I)||E(i,I)){let C=Mt(p);_=Bt(C,c),g="ml-tensor";let A=u.webnnCreateTemporaryTensor,R=u.webnnUploadTensor;if(!A||!R)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let x=await A(i,C,c);R(x,new Uint8Array(k.buffer,k.byteOffset,k.byteLength)),b=x}else _=k.byteLength,b=u._malloc(_),r.push(b),u.HEAPU8.set(new Uint8Array(k.buffer,k.byteOffset,_),b)}else _=k.byteLength,b=u._malloc(_),r.push(b),u.HEAPU8.set(new Uint8Array(k.buffer,k.byteOffset,_),b)}}let v=u.stackSave(),T=u.stackAlloc(4*c.length);try{c.forEach(($,E)=>u.setValue(T+E*l,$,l===4?"i32":"i64"));let k=u._OrtCreateTensor(Mt(p),b,_,T,c.length,An(g));k===0&&ge(`Can't create tensor for input/output. session=${i}, index=${a}.`),t.push(k)}finally{u.stackRestore(v)}},ga=async(e,t,r,i,n,a)=>{let s=$e(),u=s.PTR_SIZE,l=_t.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=l[0],c=l[1],f=l[2],g=l[3],b=l[4],_=l[5],v=t.length,T=i.length,k=0,$=[],E=[],I=[],C=[],A=[],R=s.stackSave(),x=s.stackAlloc(v*u),U=s.stackAlloc(v*u),V=s.stackAlloc(T*u),H=s.stackAlloc(T*u);try{[k,$]=zp(a),Dt("wasm prepareInputOutputTensor");for(let O=0;O<v;O++)await In(r[O],E,C,e,c[t[O]],t[O],b);for(let O=0;O<T;O++)await In(n[O],I,C,e,f[i[O]],v+i[O],b);Nt("wasm prepareInputOutputTensor");for(let O=0;O<v;O++)s.setValue(x+O*u,E[O],"*"),s.setValue(U+O*u,c[t[O]],"*");for(let O=0;O<T;O++)s.setValue(V+O*u,I[O],"*"),s.setValue(H+O*u,f[i[O]],"*");if(g&&!_){let{handle:O,outputPreferredLocations:q,outputPreferredLocationsEncoded:ee}=g;if(c.length!==v)throw new Error(`input count from feeds (${v}) is expected to be always equal to model's input count (${c.length}).`);Dt("wasm bindInputsOutputs");for(let te=0;te<v;te++){let Y=t[te];await s._OrtBindInput(O,c[Y],E[te])!==0&&ge(`Can't bind input[${te}] for session=${e}.`)}for(let te=0;te<T;te++){let Y=i[te];n[te]?.[3]?(A.push(I[te]),s._OrtBindOutput(O,f[Y],I[te],0)!==0&&ge(`Can't bind pre-allocated output[${te}] for session=${e}.`)):s._OrtBindOutput(O,f[Y],0,ee[Y])!==0&&ge(`Can't bind output[${te}] to ${q[te]} for session=${e}.`)}Nt("wasm bindInputsOutputs"),_t.set(e,[p,c,f,g,b,!0])}s.jsepOnRunStart?.(p),s.webnnOnRunStart?.(p);let W;g?W=await s._OrtRunWithBinding(p,g.handle,T,V,k):W=await s._OrtRun(p,U,x,v,H,T,V,k),W!==0&&ge("failed to call OrtRun().");let F=[],re=[];Dt("wasm ProcessOutputTensor");for(let O=0;O<T;O++){let q=Number(s.getValue(V+O*u,"*"));if(q===I[O]||A.includes(I[O])){F.push(n[O]),q!==I[O]&&s._OrtReleaseTensor(q)!==0&&ge("Can't release tensor.");continue}let ee=s.stackSave(),te=s.stackAlloc(4*u),Y=!1,oe,P=0;try{s._OrtGetTensorData(q,te,te+u,te+2*u,te+3*u)!==0&&ge(`Can't access output tensor data on index ${O}.`);let ie=u===4?"i32":"i64",K=Number(s.getValue(te,ie));P=s.getValue(te+u,"*");let Z=s.getValue(te+u*2,"*"),_e=Number(s.getValue(te+u*3,ie)),Ee=[];for(let ye=0;ye<_e;ye++)Ee.push(Number(s.getValue(Z+ye*u,ie)));s._OrtFree(Z)!==0&&ge("Can't free memory for tensor dims.");let ve=Ee.reduce((ye,ke)=>ye*ke,1);oe=ot(K);let Oe=g?.outputPreferredLocations[i[O]];if(oe==="string"){if(Oe==="gpu-buffer"||Oe==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ye=[];for(let ke=0;ke<ve;ke++){let De=s.getValue(P+ke*u,"*"),xt=s.getValue(P+(ke+1)*u,"*"),_r=ke===ve-1?void 0:xt-De;ye.push(s.UTF8ToString(De,_r))}F.push([oe,Ee,ye,"cpu"])}else if(Oe==="gpu-buffer"&&ve>0){let ye=s.jsepGetBuffer;if(!ye)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ke=ye(P),De=Bt(K,ve);if(De===void 0||!Qn(oe))throw new Error(`Unsupported data type: ${oe}`);Y=!0,F.push([oe,Ee,{gpuBuffer:ke,download:s.jsepCreateDownloader(ke,De,oe),dispose:()=>{s._OrtReleaseTensor(q)!==0&&ge("Can't release tensor.")}},"gpu-buffer"])}else if(Oe==="ml-tensor"&&ve>0){let ye=s.webnnEnsureTensor,ke=s.webnnIsGraphInputOutputTypeSupported;if(!ye||!ke)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Bt(K,ve)===void 0||!Yn(oe))throw new Error(`Unsupported data type: ${oe}`);if(!ke(e,oe,!1))throw new Error(`preferredLocation "ml-tensor" for ${oe} output is not supported by current WebNN Context.`);let De=await ye(e,P,K,Ee,!1);Y=!0,F.push([oe,Ee,{mlTensor:De,download:s.webnnCreateMLTensorDownloader(P,oe),dispose:()=>{s.webnnReleaseTensorId(P),s._OrtReleaseTensor(q)}},"ml-tensor"])}else if(Oe==="ml-tensor-cpu-output"&&ve>0){let ye=s.webnnCreateMLTensorDownloader(P,oe)(),ke=F.length;Y=!0,re.push((async()=>{let De=[ke,await ye];return s.webnnReleaseTensorId(P),s._OrtReleaseTensor(q),De})()),F.push([oe,Ee,[],"cpu"])}else{let ye=ti(oe),ke=new ye(ve);new Uint8Array(ke.buffer,ke.byteOffset,ke.byteLength).set(s.HEAPU8.subarray(P,P+ke.byteLength)),F.push([oe,Ee,ke,"cpu"])}}finally{s.stackRestore(ee),oe==="string"&&P&&s._free(P),Y||s._OrtReleaseTensor(q)}}g&&!b&&(s._OrtClearBoundOutputs(g.handle)!==0&&ge("Can't clear bound outputs."),_t.set(e,[p,c,f,g,b,!1]));for(let[O,q]of await Promise.all(re))F[O][2]=q;return Nt("wasm ProcessOutputTensor"),F}finally{s.webnnOnRunEnd?.(p),s.stackRestore(R),E.forEach(W=>s._OrtReleaseTensor(W)),I.forEach(W=>s._OrtReleaseTensor(W)),C.forEach(W=>s._free(W)),k!==0&&s._OrtReleaseRunOptions(k),$.forEach(W=>s._free(W))}},ya=e=>{let t=$e(),r=_t.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&ge("Can't get an profile file name."),t._OrtFree(n)},_a=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),bt,We,Ht,dr,pr,Vr,En,Gr,At,Ot,rp,Rf,Mf,Bf,Df,Nf,Uf,Pf,qf=L(()=>{"use strict";Ve(),Of(),Lt(),Kn(),bt=()=>!!be.wasm.proxy&&typeof document<"u",Ht=!1,dr=!1,pr=!1,Gr=new Map,At=(e,t)=>{let r=Gr.get(e);r?r.push(t):Gr.set(e,[t])},Ot=()=>{if(Ht||!dr||pr||!We)throw new Error("worker not ready")},rp=e=>{switch(e.data.type){case"init-wasm":Ht=!1,e.data.err?(pr=!0,En[1](e.data.err)):(dr=!0,En[0]()),Vr&&(URL.revokeObjectURL(Vr),Vr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Gr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Rf=async()=>{if(!dr){if(Ht)throw new Error("multiple calls to 'initWasm()' detected.");if(pr)throw new Error("previous call to 'initWasm()' failed.");if(Ht=!0,bt())return new Promise((e,t)=>{We?.terminate(),Ip().then(([r,i])=>{try{We=i,We.onerror=a=>t(a),We.onmessage=rp,En=[e,t];let n={type:"init-wasm",in:be};!n.in.wasm.wasmPaths&&(r||Cn)&&(n.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),We.postMessage(n),Vr=r}catch(n){t(n)}},t)});try{await Zn(be.wasm),await ca(be),dr=!0}catch(e){throw pr=!0,e}finally{Ht=!1}}},Mf=async e=>{if(bt())return Ot(),new Promise((t,r)=>{At("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:be}};We.postMessage(i)});await ha(be,e)},Bf=async e=>bt()?(Ot(),new Promise((t,r)=>{At("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};We.postMessage(i,[e.buffer])})):ei(e),Df=async(e,t)=>{if(bt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Ot(),new Promise((r,i)=>{At("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),We.postMessage(n,a)})}else return fa(e,t)},Nf=async e=>{if(bt())return Ot(),new Promise((t,r)=>{At("release",[t,r]);let i={type:"release",in:e};We.postMessage(i)});ma(e)},Uf=async(e,t,r,i,n,a)=>{if(bt()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Ot(),new Promise((s,u)=>{At("run",[s,u]);let l=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:i,options:a}};We.postMessage(p,_a(l))})}else return ga(e,t,r,i,n,a)},Pf=async e=>{if(bt())return Ot(),new Promise((t,r)=>{At("end-profiling",[t,r]);let i={type:"end-profiling",in:e};We.postMessage(i)});ya(e)}}),zn,ip,Lf,ky=L(()=>{"use strict";Ve(),qf(),ne(),jn(),Ap(),zn=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},ip=e=>{switch(e[3]){case"cpu":return new Pe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Qn(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return Pe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!Yn(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return Pe.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},Lf=class{async fetchModelAndCopyToWasmMemory(e){return Bf(await Jn(e))}async loadModel(e,t){rt();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Df(r,t),Qe()}async dispose(){return Nf(this.sessionId)}async run(e,t,r){rt();let i=[],n=[];Object.entries(e).forEach(f=>{let g=f[0],b=f[1],_=this.inputNames.indexOf(g);if(_===-1)throw new Error(`invalid input '${g}'`);i.push(b),n.push(_)});let a=[],s=[];Object.entries(t).forEach(f=>{let g=f[0],b=f[1],_=this.outputNames.indexOf(g);if(_===-1)throw new Error(`invalid output '${g}'`);a.push(b),s.push(_)});let u=i.map((f,g)=>zn(f,()=>`input "${this.inputNames[n[g]]}"`)),l=a.map((f,g)=>f?zn(f,()=>`output "${this.outputNames[s[g]]}"`):null),p=await Uf(this.sessionId,n,u,s,l,r),c={};for(let f=0;f<p.length;f++)c[this.outputNames[s[f]]]=a[f]??ip(p[f]);return Qe(),c}startProfiling(){}endProfiling(){Pf(this.sessionId)}}}),Wf={};Xt(Wf,{OnnxruntimeWebAssemblyBackend:()=>Gn,initializeFlags:()=>Vn,wasmBackend:()=>Vf});var Vn,Gn,Vf,Ty=L(()=>{"use strict";Ve(),qf(),ky(),Vn=()=>{(typeof be.wasm.initTimeout!="number"||be.wasm.initTimeout<0)&&(be.wasm.initTimeout=0);let e=be.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),be.wasm.simd=!1),typeof be.wasm.proxy!="boolean"&&(be.wasm.proxy=!1),typeof be.wasm.trace!="boolean"&&(be.wasm.trace=!1),typeof be.wasm.numThreads!="number"||!Number.isInteger(be.wasm.numThreads)||be.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)be.wasm.numThreads=1;else{let t=typeof navigator>"u"?d0("node:os").cpus().length:navigator.hardwareConcurrency;be.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Gn=class{async init(e){Vn(),await Rf(),await Mf(e)}async createInferenceSessionHandler(e,t){let r=new Lf;return await r.loadModel(e,t),r}},Vf=new Gn});Ve();Ve();Ve();var Iy="1.29.0";{let e=(Ty(),gr(Wf)).wasmBackend;Ft("webgpu",e,5),Ft("webnn",e,5),Ft("cpu",e,10),Ft("wasm",e,10)}Object.defineProperty(be.versions,"web",{value:Iy,enumerable:!0});var Ey="/models/ocr/manifest.json",ba="ppocr-models-v3";async function zy(e){let t=e.startsWith("/")&&typeof self<"u"&&self.location?self.location.origin+e:e;try{let r=await fetch(t);if(r.ok)return r}catch(r){console.warn(`[OCR ModelManager] Failed to fetch ${t}:`,r)}if(e.includes("huggingface.co")){let r=e.replace("huggingface.co","hf-mirror.com");console.info(`[OCR ModelManager] Retrying with mirror: ${r}`);let i=await fetch(r);if(i.ok)return i}throw new Error(`Failed to fetch ${e}`)}function Cy(e){if(e.byteLength>1024)return!1;let t=new TextDecoder().decode(new Uint8Array(e));return t.startsWith("version https://git-lfs")||t.includes("oid sha256:")}async function Hf(e,t){try{let c=await caches.open(ba),f=await c.match(e);if(f){let g=await f.arrayBuffer();if(!Cy(g))return t(g.byteLength,g.byteLength),g;await c.delete(e)}}catch(c){console.warn("[OCR ModelManager] Cache match error, continuing with network fetch:",c)}let r=await zy(e),i=Number(r.headers.get("content-length")??0),n=r.clone().body.getReader(),a=0,s=[];for(;;){let{done:c,value:f}=await n.read();if(c)break;s.push(f),a+=f.byteLength,t(a,i||a)}let u=s.reduce((c,f)=>c+f.byteLength,0),l=new Uint8Array(u),p=0;for(let c of s)l.set(c,p),p+=c.byteLength;try{await(await caches.open(ba)).put(e,new Response(l.buffer,{headers:{"content-type":"application/octet-stream"}}))}catch(c){console.warn("[OCR ModelManager] Failed to store in cache:",c)}return l.buffer}var ri=null;async function Ay(){if(ri)return ri;let e=await fetch(Ey);if(!e.ok)throw new Error(`Cannot load model manifest: ${e.status}`);return ri=await e.json(),ri}function Oy(e){if(e.includes("character_dict:")){let r=e.split(`
`),i=[],n=!1;for(let a of r){let s=a.trimEnd();if(!n){s.trim()==="character_dict:"&&(n=!0);continue}let u=s.match(/^\s*-\s*(.*)$/);if(u){let l=u[1].trim();if(l.startsWith("'")&&l.endsWith("'")&&l.length>=2)l=l.slice(1,-1).replace(/''/g,"'");else if(l.startsWith('"')&&l.endsWith('"')&&l.length>=2)try{l=JSON.parse(l)}catch{l=l.slice(1,-1)}i.push(l)}else if(s.trim()&&!s.startsWith("#")&&!s.startsWith(" "))break}if(i.length>0)return i.includes(" ")||i.push(" "),i}let t=e.split(/\r?\n/).map(r=>r.trim()).filter(Boolean);return t.includes(" ")||t.push(" "),t}async function Ff(e,t,r){let i=typeof self<"u"&&self.location?self.location.origin+"/ort/":"/ort/";be.wasm.wasmPaths=i,be.wasm.numThreads=1,t==="webgpu"&&(be.wasm.proxy=!1);let a=(await Ay())[e];if(!a)throw new Error(`Unknown model scale: ${e}`);let s=await Hf(a.det,(g,b)=>{r({stage:"download_det",loaded:g,total:b||a.detSizeBytes,percent:b?g/b*50:25,modelScale:e})}),u=await Hf(a.rec,(g,b)=>{r({stage:"download_rec",loaded:g,total:b||a.recSizeBytes,percent:50+(b?g/b*40:20),modelScale:e})});r({stage:"init_session",loaded:0,total:1,percent:90,modelScale:e});let l,p;if(t==="webgpu")try{if(typeof navigator>"u"||!("gpu"in navigator)||!navigator.gpu)throw new Error("WebGPU not supported in current environment");let g={executionProviders:["webgpu","wasm"]};[l,p]=await Promise.all([ut.create(new Uint8Array(s),g),ut.create(new Uint8Array(u),g)])}catch(g){console.warn("[OCR ModelManager] WebGPU init failed, falling back to WASM:",g);let b={executionProviders:["wasm"]};[l,p]=await Promise.all([ut.create(new Uint8Array(s),b),ut.create(new Uint8Array(u),b)])}else{let g={executionProviders:["wasm"]};[l,p]=await Promise.all([ut.create(new Uint8Array(s),g),ut.create(new Uint8Array(u),g)])}let c="";try{let g=await caches.open(ba),b=await g.match(a.dict);if(b)c=await b.text();else{let _=await fetch(a.dict);if(!_.ok)throw new Error(`Cannot load dict: ${_.status}`);c=await _.text(),await g.put(a.dict,new Response(c,{headers:{"content-type":"text/plain"}}))}}catch{let g=await fetch(a.dict);if(!g.ok)throw new Error(`Cannot load dict: ${g.status}`);c=await g.text()}let f=Oy(c);return r({stage:"init_session",loaded:1,total:1,percent:100,modelScale:e}),{detSession:l,recSession:p,dict:f,entry:a}}var wa=[.485,.456,.406],$a=[.229,.224,.225],va=[.5,.5,.5],xa=[.5,.5,.5];function jf(e){let{width:t,height:r,data:i}=e,n=Math.min(960/Math.max(t,r),1),a=Math.round(t*n),s=Math.round(r*n);a=Math.ceil(a/32)*32,s=Math.ceil(s/32)*32;let u=t/a,l=r/s,c=new OffscreenCanvas(a,s).getContext("2d"),f=new OffscreenCanvas(t,r);f.getContext("2d").putImageData(e,0,0),c.drawImage(f,0,0,a,s);let b=c.getImageData(0,0,a,s).data,_=new Float32Array(3*s*a),v=s*a;for(let T=0;T<v;T++){let k=b[T*4]/255,$=b[T*4+1]/255,E=b[T*4+2]/255;_[0*v+T]=(E-wa[0])/$a[0],_[1*v+T]=($-wa[1])/$a[1],_[2*v+T]=(k-wa[2])/$a[2]}return{tensor:_,inputH:s,inputW:a,scaleH:l,scaleW:u}}function Kf(e,t){let[r,i,n,a]=t,s=Math.hypot(i[0]-r[0],i[1]-r[1]),u=Math.hypot(n[0]-a[0],n[1]-a[1]),l=Math.hypot(a[0]-r[0],a[1]-r[1]),p=Math.hypot(n[0]-i[0],n[1]-i[1]),c=Math.round(Math.max(s,u)),f=Math.round(Math.max(l,p)),g=Math.min(c,4096),b=new OffscreenCanvas(e.width,e.height);b.getContext("2d").putImageData(e,0,0);let v=t.map(O=>O[0]),T=t.map(O=>O[1]),k=Math.max(0,Math.min(e.width-1,Math.floor(Math.min(...v)))),$=Math.max(0,Math.min(e.height-1,Math.floor(Math.min(...T)))),E=Math.max(k+1,Math.min(e.width,Math.ceil(Math.max(...v)))),I=Math.max($+1,Math.min(e.height,Math.ceil(Math.max(...T)))),C=E-k,A=I-$,R=48,x=C/Math.max(A,1),U=Math.max(16,Math.min(3200,Math.round(R*x))),H=new OffscreenCanvas(U,R).getContext("2d");H.drawImage(b,k,$,C,A,0,0,U,R);let W=H.getImageData(0,0,U,R).data,F=R*U,re=new Float32Array(3*F);for(let O=0;O<F;O++){let q=W[O*4]/255,ee=W[O*4+1]/255,te=W[O*4+2]/255;re[0*F+O]=(te-va[0])/xa[0],re[1*F+O]=(ee-va[1])/xa[1],re[2*F+O]=(q-va[2])/xa[2]}return{tensor:re,width:U}}function Zf(e,t,r,i,n){let a=new Uint8Array(t*r);for(let p=0;p<a.length;p++)a[p]=e[p]>=.2?1:0;let s=Ry(a,t,r),u=[],l=new Uint8Array(t*r);for(let p=0;p<t;p++)for(let c=0;c<r;c++){let f=p*r+c;if(!s[f]||l[f])continue;let g=[],b=[f];for(l[f]=1;b.length;){let H=b.pop(),W=Math.floor(H/r),F=H%r;g.push([F,W]);for(let[re,O]of[[W-1,F],[W+1,F],[W,F-1],[W,F+1]]){if(re<0||re>=t||O<0||O>=r)continue;let q=re*r+O;!s[q]||l[q]||(l[q]=1,b.push(q))}}if(g.length<16)continue;let _=1/0,v=1/0,T=-1/0,k=-1/0,$=0;for(let[H,W]of g)H<_&&(_=H),H>T&&(T=H),W<v&&(v=W),W>k&&(k=W),$+=e[W*r+H];let E=$/g.length;if(E<.4)continue;let I=w*h*1.5/Math.max(2*(w+h),1),C=Math.max(0,_-I),A=Math.max(0,v-I),R=Math.min(r-1,T+I),x=Math.min(t-1,k+I),U=H=>H*n,V=H=>H*i;u.push({score:E,points:[[U(C),V(A)],[U(R),V(A)],[U(R),V(x)],[U(C),V(x)]]})}return u}function Ry(e,t,r){let i=new Uint8Array(t*r);for(let n=0;n<t;n++)for(let a=0;a<r;a++){let s=0;e:for(let u=-1;u<=1;u++)for(let l=-1;l<=1;l++){let p=n+u,c=a+l;if(p>=0&&p<t&&c>=0&&c<r&&e[p*r+c]){s=1;break e}}i[n*r+a]=s}return i}function Xf(e,t,r,i){let n="",a=0,s=0,u=-1;for(let l=0;l<t;l++){let p=-1/0,c=0,f=l*r;for(let g=0;g<r;g++)e[f+g]>p&&(p=e[f+g],c=g);if(c!==0&&c!==u){let g=1;if(p>=0&&p<=1)g=p;else{let _=0;for(let v=0;v<r;v++)_+=Math.exp(e[f+v]-p);g=_>0?1/_:.85}let b=c>0&&c<=i.length?i[c-1]??"":"";b&&(n+=b,a+=g,s++)}u=c}return{text:n,confidence:s>0?a/s:0}}var ii=null,Sa="small";async function My(e){try{ii=await Ff(e.modelScale,e.backend,r=>{self.postMessage({type:"PROGRESS",...r})}),Sa=e.modelScale,self.postMessage({type:"READY",modelScale:e.modelScale})}catch(t){let r=t instanceof Error?t.message:String(t);self.postMessage({type:"ERROR",message:r})}}async function By(e){if(!ii){self.postMessage({type:"ERROR",message:"[OCR] Model not loaded"});return}let t=Date.now(),{detSession:r,recSession:i,dict:n}=ii;try{let{imageData:a}=e,{tensor:s,inputH:u,inputW:l,scaleH:p,scaleW:c}=jf(a),f=new Pe("float32",s,[1,3,u,l]),g={},b=r.inputNames[0]??"x";g[b]=f;let _=await r.run(g),v=r.outputNames[0],T=_[v].data,k=u,$=l,E=T.length-k*$,I=T.slice(E),C=Zf(I,k,$,p,c);if(C.length===0){let re=Date.now()-t;self.postMessage({type:"RESULT",boxes:[],text:"",lines:[],stats:{lineCount:0,charCount:0,durationMs:re,modelScale:Sa}});return}let A=i.inputNames[0]??"x",R=[],x=[],U=[...C].sort((re,O)=>{let q=Math.min(...re.points.map(te=>te[1])),ee=Math.min(...O.points.map(te=>te[1]));return q-ee}),V=0;for(let re of U){let{tensor:O,width:q}=Kf(a,re.points),ee=new Pe("float32",O,[1,3,48,q]),te={};te[A]=ee;let Y=await i.run(te),oe=i.outputNames[0],P=Y[oe],ie=P.data,K=P.dims,Z,_e;K.length===3?K[0]===1?(Z=K[1],_e=K[2]):(Z=K[0],_e=K[2]):(Z=K[0],_e=K[1]);let{text:Ee,confidence:ve}=Xf(ie,Z,_e,n);Ee.trim()&&(R.push({points:re.points,text:Ee,confidence:ve}),x.push(Ee),V+=ve)}let H=x.join(`
`),W=Date.now()-t,F=x.length>0?V/x.length:0;self.postMessage({type:"RESULT",boxes:R,text:H,lines:x,stats:{lineCount:x.length,charCount:H.replace(/\s/g,"").length,durationMs:W,modelScale:Sa,confidence:F}})}catch(a){let s=`[OCR] ${a instanceof Error?a.message:String(a)}`;self.postMessage({type:"ERROR",message:s})}}self.addEventListener("message",async e=>{let t=e.data;switch(t.type){case"INIT":await My(t);break;case"RECOGNIZE":await By(t);break;case"DISPOSE":ii=null;break}});
/*! Bundled license information:

onnxruntime-web/dist/ort.bundle.min.mjs:
  (*!
   * ONNX Runtime Web v1.29.0
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)

onnxruntime-web/dist/ort.bundle.min.mjs:
  (**
   * @license
   * Copyright 2021 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2020 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
*/
