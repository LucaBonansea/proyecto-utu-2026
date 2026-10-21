#!/bin/sh

BASE_URL="http://localhost:5501"

PASS=0
FAIL=0

check_status() {
    NAME="$1"
    EXPECTED="$2"
    shift 2

    ACTUAL=$(curl -s -o /dev/null -w "%{http_code}" "$@")

    if [ "$ACTUAL" = "$EXPECTED" ]; then
        echo "[PASS] $NAME -> HTTP $ACTUAL"
        PASS=$((PASS + 1))
    else
        echo "[FAIL] $NAME -> esperado $EXPECTED, recibido $ACTUAL"
        FAIL=$((FAIL + 1))
    fi
}

echo "===================================="
echo " Auditoría básica de seguridad API"
echo "===================================="
echo

check_status \
    "Ruta inexistente" \
    "404" \
    "$BASE_URL/api/ruta-que-no-existe"

check_status \
    "Ruta admin sin autenticación" \
    "401" \
    "$BASE_URL/api/admin/reclamos"

check_status \
    "Notificaciones sin autenticación" \
    "401" \
    "$BASE_URL/api/notificaciones"

echo
echo "===================================="
echo " Resultados"
echo "===================================="
echo "PASS: $PASS"
echo "FAIL: $FAIL"

if [ "$FAIL" -gt 0 ]; then
    exit 1
else
    exit 0
fi