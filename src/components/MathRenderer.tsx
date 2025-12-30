'use client'

import { useEffect, useRef, useState } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

interface MathRendererProps {
  content: string
  className?: string
  block?: boolean
}

export default function MathRenderer({ content, className = '', block = false }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current || !content) return

    try {
      // Fix common LaTeX issues
      let processedContent = content
        .replace(/\t/g, '\\t')
        .replace(/\r/g, '\\r')
        .replace(/\f/g, '\\f')
        .replace(/imes/g, '\\times')
        .replace(/rac\{/g, '\\frac{')
        .replace(/sqrt\{/g, '\\sqrt{')
        .replace(/([^\\])cdot/g, '$1\\cdot')
        .replace(/ div /g, ' \\div ')
        .replace(/ pm /g, ' \\pm ')
        .replace(/([^\\])leq/g, '$1\\leq')
        .replace(/([^\\])geq/g, '$1\\geq')
        .replace(/([^\\])neq/g, '$1\\neq')

      // Process LaTeX delimiters
      const latexRegex = /\$\$([\s\S]*?)\$\$|\$([\s\S]*?)\$/g
      let lastIndex = 0
      let result = ''

      processedContent.replace(latexRegex, (match, displayMath, inlineMath, offset) => {
        // Add text before match
        result += processedContent.slice(lastIndex, offset)
        
        const mathContent = displayMath || inlineMath
        const isDisplay = displayMath !== undefined

        try {
          const rendered = katex.renderToString(mathContent, {
            displayMode: isDisplay,
            throwOnError: false,
            errorColor: '#ef4444',
            trust: true,
            strict: false,
          })
          result += rendered
        } catch {
          result += match // Keep original on error
        }

        lastIndex = offset + match.length
        return match
      })

      // Add remaining text
      result += processedContent.slice(lastIndex)

      // Replace newlines with <br>
      result = result.replace(/\n/g, '<br/>')

      containerRef.current.innerHTML = result
      setError(null)
    } catch (e: any) {
      setError(e.message)
      if (containerRef.current) {
        containerRef.current.textContent = content
      }
    }
  }, [content])

  if (!content) return null

  return (
    <div 
      ref={containerRef} 
      className={`math-renderer ${block ? 'block' : 'inline'} ${className}`}
    />
  )
}
