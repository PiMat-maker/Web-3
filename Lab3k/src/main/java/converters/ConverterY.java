package main.java.converters;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

@FacesConverter("converterY")
public class ConverterY implements Converter {
    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        return value.substring(0, Math.min(value.length(), 7));
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        return value.toString().substring(0, Math.min(value.toString().length(), 7));
    }
}
