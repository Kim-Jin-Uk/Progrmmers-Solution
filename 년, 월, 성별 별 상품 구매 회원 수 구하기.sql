SELECT YEAR, MONTH, GENDER, COUNT(U.USER_ID) AS USERS
FROM (
    SELECT USER_ID, GENDER
    FROM USER_INFO
    WHERE NOT GENDER IS NULL
) U
JOIN (
    SELECT 
    DISTINCT USER_ID, YEAR(SALES_DATE) AS YEAR, MONTH(SALES_DATE) AS MONTH
    FROM ONLINE_SALE
) S
ON U.USER_ID = S.USER_ID
GROUP BY YEAR, MONTH, GENDER
ORDER BY YEAR ASC, MONTH ASC, GENDER ASC