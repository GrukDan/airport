package bsuir.preferenceMethod;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class PreferenceMethodImpl implements PreferenceMethod {

    //модифицированная матрица предпотчений
    private double[][] getModifiedPreferenceMatrix(double[][] preferenceMatrix) {
        int alternativesCount = preferenceMatrix[0].length;
        for(int i = 0; i< preferenceMatrix.length;i++){
            for(int j = 0;j<preferenceMatrix[0].length;j++){
                preferenceMatrix[i][j] = alternativesCount-preferenceMatrix[i][j];
            }
        }
        return preferenceMatrix;
    }

    //суммарные оценки предпочтений
    private Map<Long, Double> getTotalPreferenceScores(double[][] preferenceMatrix, List<Long> alternativesId) {
        Map<Long,Double> totalPreferenceScores = new HashMap<>();
        double totalPreferenceByAlternative = 0;
        for(int j = 0; j<preferenceMatrix[0].length;j++){
            for(int i = 0; i<preferenceMatrix.length;i++){
                totalPreferenceByAlternative+=preferenceMatrix[i][j];
            }
            totalPreferenceScores.put(alternativesId.get(j),totalPreferenceByAlternative);
        }
        return totalPreferenceScores;
    }

    //веса целей
    private Map<Long, Double> weightGoals(Map<Long, Double> totalPreferenceScores) {
        double sumAllRatings=0;
        for(Map.Entry<Long, Double> entry: totalPreferenceScores.entrySet()) {
            sumAllRatings+=entry.getValue();
        }
        for(Map.Entry<Long, Double> entry: totalPreferenceScores.entrySet()) {
            totalPreferenceScores.put(entry.getKey(),entry.getValue()/sumAllRatings);
        }
        return totalPreferenceScores;
    }

    @Override
    public Map<Long, Double> getSolution(double[][] preferenceMatrix, List<Long> alternativesId) {
        double[][] modifiedMatrix = getModifiedPreferenceMatrix(preferenceMatrix);
        Map<Long, Double> totalPreferenceScores = getTotalPreferenceScores(modifiedMatrix, alternativesId);
        return weightGoals(totalPreferenceScores);
    }
}
