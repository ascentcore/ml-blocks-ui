import MUIWrapper from './Components/MUIWrapper';
import { MUIAddButton } from './Components/MUIAddButton';
import { MUICheckbox } from './Components/MUICheckbox';
import { MUITextField } from './Components/MUITextField';
import { MUISelectElement } from './Components/MUIDropdown';


const customRegistry = {
    string: { component: MUITextField, wrapper: MUIWrapper },
    integer: { component: MUITextField, wrapper: MUIWrapper },
    enum: { component: MUISelectElement, wrapper: MUIWrapper },
    addButton: { component: MUIAddButton, wrapper: MUIWrapper },
    boolean: { component: MUICheckbox, wrapper: MUIWrapper }
}


export default customRegistry