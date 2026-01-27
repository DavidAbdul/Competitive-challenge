# Guía Rápida

## Para Participantes

### Paso 1: Clonar y Setup (2 minutos)

```bash
git clone https://github.com/TU_USUARIO/Competitive-challenge.git
cd Competitive-challenge
npm install
```

### Paso 2: Resolver (tu tiempo)

Cada challenge está en `challenges/challengeX/`:

```bash
challenges/
├── challenge1-two-sum/
│   ├── README.md      # Lee el problema aquí
│   └── solution.js    # Escribe tu código aquí
├── challenge2-binary-search/
└── challenge3-linked-list/
```

**Solo edita `solution.js` - NO toques `test.js`**

### Paso 3: Probar

```bash
npm test              # ¿Funciona?
npm run test:time     # ¿Qué tan rápido?
```

### Paso 4: Subir

```bash
git checkout -b solucion/TU_NOMBRE
git add .
git commit -m "Mi solución"
git push origin solucion/TU_NOMBRE
```

Luego crea un Pull Request en GitHub.

---

## Comandos Útiles

```bash
npm test                # Todos los tests
npm test challenge1     # Solo un challenge
npm run validate        # ¿Olvidaste algo?
```

---

## Tips

1. **Lee el README** de cada challenge primero
2. **Prueba seguido** - corre `npm test` después de cada cambio
3. **Empieza simple** - primero que funcione, luego optimiza
4. **Revisa la complejidad** - cada README dice la complejidad esperada

---

## Ejemplo Completo

```bash
# Setup inicial
git clone https://github.com/usuario/Competitive-challenge.git
cd Competitive-challenge
npm install

# Crear rama
git checkout -b solucion/juan

# Resolver challenge 1
code challenges/challenge1-two-sum/solution.js
# ... escribir código ...

# Probar
npm test challenge1
# ✅ Si pasa, continuar

# Resolver todos
npm test
# ✅ Todos pasan

# Ver tiempos
npm run test:time

# Subir
git add .
git commit -m "Solución de Juan"
git push origin solucion/juan

# Crear PR en GitHub
```

---

## FAQ

**Q: ¿Puedo usar librerías?**  
A: Solo las built-in de Node.js

**Q: ¿Cuánto tiempo tengo?**  
A: Revisa el README principal

**Q: ¿Qué pasa si no termino todos?**  
A: Sube los que completes

**Q: Mi test falla, ¿qué hago?**  
A: Usa `console.log()` en tu solution.js para ver qué pasa

---

**¿Listo?** → `npm install` y empieza a programar!
