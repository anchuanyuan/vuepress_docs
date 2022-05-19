import * as components from './components'
import type {App,} from "vue";

export default {
    install: (app:App) =>{
        for (const key in components) {
            // @ts-ignore
            const comp = components[key]
            // @ts-ignore
            if(comp.install) {
                app.use(comp)
            }else {
                // @ts-ignore
                app.component(components[key].name,components[key])

            }
        }
        return app
    }
}
