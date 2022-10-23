SELECT O.ANIMAL_ID, O.NAME
FROM ANIMAL_INS AS I
LEFT JOIN ANIMAL_OUTS AS O
ON I.ANIMAL_ID = O.ANIMAL_ID
WHERE NOT O.DATETIME IS NULL
-- mysql에서 시간1 - 시간2는 정상적으로 동작하지 않음 TIMESTAMPDIFF를 이용하자
ORDER BY TIMESTAMPDIFF(DAY,O.DATETIME,I.DATETIME) ASC
LIMIT 2