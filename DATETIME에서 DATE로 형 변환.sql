SELECT ANIMAL_ID, NAME, SUBSTR(DATETIME,1,10) AS 날짜
FROM ANIMAL_INS
ORDER BY ANIMAL_ID ASC