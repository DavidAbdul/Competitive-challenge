# Challenge 2: Binary Search

## 🎯 Dificultad: Medio

## 📝 Descripción

Dado un array de enteros `nums` ordenado en orden **ascendente**, y un entero `target`, escribe una función para buscar `target` en `nums`.

Si `target` existe, devuelve su índice. De lo contrario, devuelve `-1`.

Debes escribir un algoritmo con complejidad de tiempo **O(log n)**.

## 📋 Ejemplos

### Ejemplo 1:
```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explicación: 9 existe en nums y su índice es 4
```

### Ejemplo 2:
```
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explicación: 2 no existe en nums así que devolvemos -1
```

### Ejemplo 3:
```
Input: nums = [5], target = 5
Output: 0
```

## ⚠️ Restricciones

- `1 <= nums.length <= 10^4`
- `-10^4 < nums[i], target < 10^4`
- Todos los enteros en `nums` son **únicos**
- `nums` está ordenado en orden ascendente

## 💡 Pistas

1. Este es un problema clásico de Binary Search
2. Compara el elemento del medio con el target
3. Reduce el espacio de búsqueda a la mitad en cada iteración
4. Puedes implementarlo recursiva o iterativamente

## 🎓 Complejidad Esperada

- **Tiempo**: O(log n)
- **Espacio**: O(1) para solución iterativa, O(log n) para recursiva
