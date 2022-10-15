SELECT HOUR, IFNULL(COUNT,0) AS COUNT
FROM (
    WITH recursive numbers AS (
        SELECT 0 AS HOUR
        UNION ALL 
        SELECT HOUR + 1 
        FROM numbers 
        WHERE HOUR < 23
    )
    SELECT * 
    FROM numbers AS n   
) A
LEFT JOIN (
    SELECT HOUR(DATETIME) AS H, COUNT(*) AS COUNT
    FROM ANIMAL_OUTS
    GROUP BY HOUR(DATETIME)
) B
ON HOUR = H