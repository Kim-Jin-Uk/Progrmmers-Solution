SELECT f.FOOD_TYPE, REST_ID, REST_NAME, f.FAVORITES 
FROM REST_INFO AS f
JOIN (
    SELECT FOOD_TYPE, MAX(FAVORITES) AS FAVORITES 
    FROM REST_INFO 
    GROUP BY FOOD_TYPE 
    ORDER BY FOOD_TYPE DESC
) s 
ON s.FOOD_TYPE = f.FOOD_TYPE 
AND s.FAVORITES = f.FAVORITES 
ORDER BY s.FOOD_TYPE DESC