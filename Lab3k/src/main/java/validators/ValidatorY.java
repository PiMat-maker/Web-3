package main.java.validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("validatorY")
public class ValidatorY implements Validator {

    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
        try{
            float y = Float.parseFloat(value.toString().substring(0, Math.min(value.toString().length(), 7)));
            if (( y < -3) || ( y > 5)) {
                throw new ValidatorException(new FacesMessage("Not in a range"));
            }
        } catch(NumberFormatException e){
            throw new ValidatorException(new FacesMessage("Not a number"));
        }

    }
}
