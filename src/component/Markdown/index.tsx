import hljs from "highlight.js";
import { marked } from "marked"
import thiny from "../../images/previewPicture-white.png"
import './index.scss'
interface IProps {
    markdown: string;
    isPreview: boolean;
}

const Markdown = ({ markdown, isPreview }: IProps) => {
    const markdownContent = marked(markdown);
    const render = new marked.Renderer();
    const selectImasHeightAndWidth = (alt: string) => {
        let index = alt.indexOf('-');
        if(index === -1) return {
            width: 1024,
            height: 1024
        };
        return {
            width: parseInt(alt.substring(0, index)),
            height: parseInt(alt.substring(index + 1))
        };
    }
    render.image = (src, _title, text) => {
        const { width, height } = selectImasHeightAndWidth(text);
        return `<img 
            src=${isPreview ? src : thiny}
            data-src=${src}
            alt=${text}
            style="aspect-ratio:${width / height}"
            class=${isPreview ? "img-loaded" : "img-loading"}
        />`
    }
    marked.setOptions({
        renderer: render,
        gfm: true,
        pedantic: false,
        sanitize: false,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    return (
        <div dangerouslySetInnerHTML={{ __html: markdownContent }}></div>
    )
}
export default Markdown;