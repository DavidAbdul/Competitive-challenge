# Challenge 1: Two Sum

## 🎯 Dificultad: Fácil

## 📝 Descripción

Dado un array de números enteros `nums` y un entero `target`, devuelve los **índices** de los dos números que suman el target.

Puedes asumir que cada input tiene **exactamente una solución**, y no puedes usar el mismo elemento dos veces.

Puedes devolver la respuesta en cualquier orden.

## 📋 Ejemplos

### Ejemplo 1:
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explicación: Porque nums[0] + nums[1] == 9, devolvemos [0, 1].
```

### Ejemplo 2:
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

### Ejemplo 3:
```
Input: nums = [3,3], target = 6
Output: [0,1]
```

## ⚠️ Restricciones

- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- Solo existe una respuesta válida

## 💡 Pistas

1. Un enfoque simple sería usar dos loops anidados (O(n²))
2. ¿Puedes pensar en una forma de hacerlo en O(n) usando una estructura de datos auxiliar?
3. Considera usar un Hash Map para almacenar los números que ya has visto

## 🎓 Complejidad Esperada

- **Tiempo**: O(n)
- **Espacio**: O(n)
