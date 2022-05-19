import AButton from './button'
import type {App,Plugin} from 'vue'

AButton.install = (app:App)=>{
    app.component(AButton.name,AButton)
    return app
}
export default AButton as typeof AButton & Plugin
