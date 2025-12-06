import React, { useState, useCallback } from 'react';
import { useUrlParams } from './hooks/useUrlParams';
import { ToastMessage } from './types';

function App() {
  const { params } = useUrlParams();
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({
        id: Date.now().toString(),
        message: `已复制: ${label}`,
        type: 'success',
      });
      setTimeout(() => setToast(null), 3000);
    } catch (err) {
      setToast({
        id: Date.now().toString(),
        message: '复制失败',
        type: 'error',
      });
      setTimeout(() => setToast(null), 3000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center space-x-3 pb-6 border-b border-slate-800">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-indigo-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">URL 参数提取器</h1>
            <p className="text-slate-400 text-sm">快速查看并复制链接中的参数值</p>
          </div>
        </header>

        {/* Content */}
        <main>
            <div className="grid gap-4">
              {params.map((param) => (
                <div 
                  key={param.id} 
                  className="group relative bg-slate-900 border border-slate-800 rounded-xl p-4 transition-all hover:border-slate-700 hover:shadow-lg hover:shadow-indigo-500/5"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    
                    {/* Key & Value Container */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-800 text-slate-400 border border-slate-700 break-all">
                          {param.key}
                        </span>
                      </div>
                      <div className="font-mono text-sm text-indigo-300 break-all whitespace-pre-wrap pr-0 md:pr-4 leading-relaxed">
                        {param.value || <span className="text-slate-600 italic">空值</span>}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 w-full md:w-auto mt-2 md:mt-0">
                      <button
                        onClick={() => copyToClipboard(param.value, param.key)}
                        className="flex items-center justify-center space-x-2 w-full md:w-auto px-4 py-2 bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700 hover:border-indigo-500 active:scale-95"
                        aria-label={`复制 ${param.key} 的值`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                        <span className="text-sm font-medium">复制</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
        </main>

        {/* Footer info */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            {params.length > 0 && params[0].key !== '默认' ? (
                 <div className="text-xs text-slate-500 mb-2">
                    共找到 {params.length} 个参数
                </div>
            ) : null}
            
            <p className="text-slate-500 text-sm mb-2">使用示例：在网址末尾添加参数</p>
            <code className="bg-slate-900 px-3 py-1.5 rounded text-indigo-400 text-xs md:text-sm font-mono select-all border border-slate-800">
                ?userId=123&token=abc-xyz
            </code>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 md:bottom-6 z-50">
          <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg shadow-xl border backdrop-blur-md animate-fade-in-up ${
            toast.type === 'success' ? 'bg-emerald-900/80 border-emerald-800 text-emerald-100' : 'bg-red-900/80 border-red-800 text-red-100'
          }`}>
             {toast.type === 'success' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
             ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                   <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                </svg>
             )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        @media (min-width: 768px) {
            @keyframes fade-in-up {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;