import sys
import os
from markdown import markdown
from weasyprint import HTML

def convert_md_to_pdf(input_md, output_pdf):
    with open(input_md, 'r', encoding='utf-8') as f:
        text = f.read()
    # Basic conversion from Markdown to HTML
    html_content = markdown(text, extensions=['fenced_code', 'toc', 'codehilite'])
    html_content = f'''
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{ font-family: "Segoe UI", Arial, sans-serif; margin: 2em; }}
            h1, h2, h3 {{ color: #2d8cff; }}
            pre, code {{ background: #f6f8fa; padding: 0.3em 0.4em; border-radius: 4px; font-family: monospace; }}
            .codehilite {{ background: #f5f2f0; }}
        </style>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    '''

    HTML(string=html_content).write_pdf(output_pdf)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python md_to_pdf.py input.md output.pdf")
        sys.exit(1)
    input_md = sys.argv[1]
    output_pdf = sys.argv[2]
    convert_md_to_pdf(input_md, output_pdf)
    print(f"Converted {input_md} -> {output_pdf}")
