# Challenge 3: Linked List Cycle

## 🎯 Dificultad: Medio

## 📝 Descripción

Dada la `head` de una linked list, determina si la linked list tiene un ciclo.

Hay un ciclo en una linked list si hay algún nodo en la lista que puede ser alcanzado nuevamente siguiendo continuamente el puntero `next`. Internamente, `pos` se usa para denotar el índice del nodo al que está conectado el puntero `next` de la cola. **Nota que `pos` no se pasa como parámetro**.

Devuelve `true` si hay un ciclo en la linked list. De lo contrario, devuelve `false`.

## 📋 Ejemplos

### Ejemplo 1:
```
Input: head = [3,2,0,-4], pos = 1
Output: true
Explicación: Hay un ciclo en la linked list, donde la cola se conecta al nodo 1 (valor 2).
```

### Ejemplo 2:
```
Input: head = [1,2], pos = 0
Output: true
Explicación: Hay un ciclo en la linked list, donde la cola se conecta al nodo 0 (valor 1).
```

### Ejemplo 3:
```
Input: head = [1], pos = -1
Output: false
Explicación: No hay ciclo en la linked list.
```

## ⚠️ Restricciones

- El número de nodos en la lista está en el rango `[0, 10^4]`
- `-10^5 <= Node.val <= 10^5`
- `pos` es `-1` o un índice válido en la linked list

## 💡 Pistas

1. ¿Puedes resolver esto usando O(1) espacio (sin usar un Set)?
2. Piensa en el algoritmo de Floyd (tortoise and hare)
3. Usa dos punteros que se muevan a diferentes velocidades
4. Si hay un ciclo, eventualmente se encontrarán

## 🎓 Complejidad Esperada

- **Tiempo**: O(n)
- **Espacio**: O(1)
