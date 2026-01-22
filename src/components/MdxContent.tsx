import React from "react";

export const mdxComponents = {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h1 className={`text-3xl md:text-4xl font-bold tracking-tight text-white mb-6 ${className || ''}`} {...props} />
    ),
    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2 className={`text-2xl font-bold text-white mt-16 mb-6 border-b border-white/10 pb-2 ${className || ''}`} {...props} />
    ),
    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3 className={`text-xl font-bold text-white mt-10 mb-4 ${className || ''}`} {...props} />
    ),
    h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h4 className={`text-lg font-bold text-white mt-8 mb-4 ${className || ''}`} {...props} />
    ),
    p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p className={`leading-7 md:leading-8 text-zinc-300 mb-6 ${className || ''}`} {...props} />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 text-zinc-300 ${className || ''}`} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className={`my-6 ml-6 list-decimal [&>li]:mt-2 text-zinc-300 ${className || ''}`} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
        <li className={`mb-2 ${className || ''}`} {...props} />
    ),
    hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
        <hr className={`my-16 border-t-2 border-white/10 ${className || ''}`} {...props} />
    ),
    blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote className={`border-l-2 border-primary pl-6 italic text-zinc-300 my-8 py-2 bg-white/5 rounded-r-lg ${className || ''}`} {...props} />
    ),
    pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
        <pre className={`mb-4 mt-6 overflow-x-auto rounded-xl border border-white/10 bg-zinc-950 py-4 px-5 ${className || ''}`} {...props} />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code className={`relative rounded bg-white/10 px-[0.3rem] py-[0.2rem] font-mono text-sm text-blue-200 ${className || ''}`} {...props} />
    ),
    img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={`rounded-xl border border-white/10 my-8 w-full ${className || ''}`} alt={alt} {...props} />
    ),
};

export default function MdxContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="mdx-content max-w-none">
            {children}
        </div>
    );
}
