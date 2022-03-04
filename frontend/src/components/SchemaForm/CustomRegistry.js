import MUIWrapper from './Components/wrappers/MUIWrapper';
import MUIFullWrapper from './Components/wrappers/MUIFullWrapper';
import MUIEmptyWrapper from './Components/wrappers/MUIEmptyWrapper';
import { MUIAddButton } from './Components/MUIAddButton';
import { MUICheckbox } from './Components/MUICheckbox';
import { MUITextField } from './Components/MUITextField';
import { MUISelectElement } from './Components/MUIDropdown';
import { MUIButton } from './Components/MUIButton';
import { MUIRemoveButton } from './Components/MUIRemoveButton';
import { MUIChooseFile } from './Components/MUIChooseFile';


const customRegistry = {
    string: { component: MUITextField, wrapper: MUIWrapper },
    integer: { component: MUITextField, wrapper: MUIWrapper },
    number: { component: MUITextField, wrapper: MUIWrapper },
    enum: { component: MUISelectElement, wrapper: MUIWrapper },
    file: { component: MUIChooseFile, wrapper: MUIEmptyWrapper },
    addButton: { component: MUIAddButton, wrapper: MUIFullWrapper },
    removeButton: { component: MUIRemoveButton, wrapper: MUIEmptyWrapper },
    button: { component: MUIButton, wrapper: MUIWrapper },
    boolean: { component: MUICheckbox, wrapper: MUIWrapper },
}


export default customRegistry