import {JodaDescriptionManager} from "@leuffen/jodastyle";
import {customElement, ka_sleep, KaCustomElement, template} from "@kasimirjs/embed";
import {joda_dev_config} from "../index";




// language=HTML
const tpl = `

    <div class="joda-showcase-element" ka.classlist="classes">
        <style></style>
        <div class="row " style="display: flex">
            <div style="width: 350px;margin: 10px" ka.for="let i of desc ">
                <div class="card">
                    <div class="card-body p-1 m-1">
                        <div class="preview">
                            <iframe ka.prop.src="'element.html?className=' + i.className"></iframe>
                            <div class="overlay"><a ka.prop.href="'element.html?className=' + i.className">Show</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;



@template(tpl, {mode: "open", stylesheets: [joda_dev_config.stylesheet]})
@customElement("joda-showcase-element")
class JodaShowcaseElement extends KaCustomElement {

    constructor() {
        super();

       /*this.shadowRootConfig.mode = "closed";
        this.shadowRootConfig.stylesheets = [
            joda_dev_config.stylesheet
        ]; */
        let scope = this.init({
            desc: JodaDescriptionManager.data,
            classes: [],
            $on: {

            }
        });
    }

    async connectedCallback(): Promise<void> {
        await ka_sleep(1);

        this.scope.classes = this.getAttribute("class");
        this.scope.desc = JodaDescriptionManager.data.filter(e => e.category === this.getAttribute("data-category"));
        console.log("connectedCallback", this.scope.desc);
        super.connectedCallback();
    }

    async disconnectedCallback(): Promise<void> {
        console.log("disconnect", this);
        this.scope.desc = [];
        super.disconnectedCallback();

    }
}
