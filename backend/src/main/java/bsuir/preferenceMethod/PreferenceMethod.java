package bsuir.preferenceMethod;

import java.util.List;
import java.util.Map;

public interface PreferenceMethod {
   Map<Long,Double> getSolution(double[][] preferenceMatrix, List<Long> alternativesId); //Map(idAlternative,weights)
}
