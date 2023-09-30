import {
    customElement,
    ka_create_element,
    ka_dom_ready, ka_sleep,
    KaCustomElement,
    KaCustomWrapper,
    template
} from "@kasimirjs/embed";
import {ka_session_storage} from "@kasimirjs/embed";
import {JodaDescriptionManager, jodaSiteConfig, Jodasplit, Logger} from "@leuffen/jodastyle";
import {SidebarWrapper, SidebarWrapperConfig} from "@kasimirjs/kit-bootstrap";
import {joda_dev_config} from "../index";




const config : SidebarWrapperConfig = {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-display-fill" viewBox="0 0 16 16">
      <path d="M6 12c0 .667-.083 1.167-.25 1.5H5a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-.75c-.167-.333-.25-.833-.25-1.5h4c2 0 2-2 2-2V4c0-2-2-2-2-2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h4z"/>
    </svg>`
}


// language=HTML
const tpl2 = `
<div>
    <h3 class="">JodaStyle Dev</h3>
    <quick-input ka.bind="$scope.siteConfig.disable_split" data-label="Disable Joda Split " data-name="test" data-type="switch"></quick-input>
    <quick-input ka.bind="$scope.siteConfig.disable_templates" data-label="Disable Joda Templates " data-name="test" data-type="switch"></quick-input>
    <quick-input ka.bind="$scope.siteConfig.disable_responsive" data-label="Disable Joda Responsive" data-name="test" data-type="switch"></quick-input>
    <quick-input ka.bind="$scope.siteConfig.debug_visualize" data-label="Joda Debug Visualize" data-name="test" data-type="switch"></quick-input>
    <quick-input ka.if="siteConfig.debug_visualize" ka.bind="$scope.siteConfig.debug_visualize_attribute" data-label="Add Attributes to Visualize" data-name="test" data-type="switch"></quick-input>
    <hr>
    <joda-example-switcher></joda-example-switcher>
</div>
`;


@customElement("joda-dev-sidebar")
@template(tpl2)
class JodaDevSidebarElement extends KaCustomElement {
    static html;
    constructor() {
        super();
        this.shadowRootConfig.mode = "closed";
        this.shadowRootConfig.stylesheets = [
           joda_dev_config.stylesheet,
        ];
        this.wrap(new SidebarWrapper(config));

        let scope = this.init({
            desc: JodaDescriptionManager.classes,
            siteConfig: jodaSiteConfig,
            $on: {
                change: async (e) => {
                    await ka_sleep(100);
                    window.location.reload();
                }
            }
        });

        let last = "";


    }
}


(async()=> {
    await ka_dom_ready();
    document.body.append(new JodaDevSidebarElement())
})()
