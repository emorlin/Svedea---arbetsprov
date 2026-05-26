# Svedea Navigation – Arbetsprov

**[Klickbar demo →](https://emorlin.github.io/svedea)**

## Lösning

En responsiv och tillgänglig huvudnavigation byggd med **vanilla HTML, CSS och JavaScript** utan frameworks eller build-steg.

Jag valde medvetet att inte använda något byggscript eller bundler. Det behövs inte för en uppgift av den här storleken, och att lägga till det hade tillfört komplexitet utan värde. Jag ville hålla lösningen så enkel som möjligt och låta fokus ligga på det som faktiskt är viktigt: semantik, tillgänglighet och webbstandarder.

### Filer

| Fil | Syfte |
|-----|-------|
| `index.html` | Minimal HTML-struktur med `<nav>` och `<div id="mobile-menu">` som containers |
| `nav-data.js` | All menydata som ett JS-objekt (8 kategorier, 30+ underlänkar) |
| `main.js` | Renderar menyn från data, hanterar interaktivitet och tillgänglighet |
| `styles.css` | All CSS med custom properties, responsiv layout och animationer |

### Desktop

Navigationen följer desktoplayouten i screenshots:
- Tre-kolumns grid: nav-länkar vänster · logo mitten · utility-ikoner + CTA höger
- "Försäkringar" öppnar en mega-dropdown med 4-kolumns grid, kategoriserade med ikoner (Lucide) och underlänkar
- Dropdown stängs med klick utanför, Escape-tangenten eller nytt klick på trigger

### Mobil – designbeslut

Jag valde ett **drill-down-mönster** istället för det originala accordion-mönstret:

```
Huvudmeny → klicka "Försäkringar" → lista med kategorier → klicka "Bil" → Bils underlänkar
```

**Varför:**
- Originalet staplar 8 expanderbara accordions på en lång lista – svårt att överblicka
- Drill-down ger en nivå åt gången, lättare att navigera med tummen
- Tydligare hierarki och kognitiv belastning minskar
- Naturlig "tillbaka"-navigation håller orientering

Hamburgermenyn täcker hela skärmen med en sökruta, drill-down-paneler, CTA och login.

### Tillgänglighet (WCAG 2.1 AA)

- Semantisk HTML: `<nav>`, `<ul>/<li>`, `<button>` etc för interaktiva element
- Skip-link till main content
- `aria-expanded` och `aria-controls` på alla toggles
- `aria-label` på ikoner och övergripande landmarks
- `aria-modal` + `role="dialog"` på mobilmenyn
- `inert`-attribut på inaktiva paneler (hindrar fokus och skärmläsare)
- Fokustrapning i mobilmenyn (Tab-cykel)
- Escape stänger öppna menyer och återlämnar fokus till trigger
- Focus-visible på alla interaktiva element med tillräcklig kontrast

### CSS-namngivning

CSS-klasserna följer en **BEM-inspirerad** konvention — inte strikt BEM, men samma grundtanke: block beskriver komponenten (`.mobile-panel`), element beskriver en del av blocket (`.mobile-panel-back`, `.mobile-panel-title`), och tillstånd hanteras med separata state-klasser som `.is-active`.

Strikt BEM hade skrivit `.mobile-panel__back` och `.mobile-panel--active`. Här används enkla bindestreck genomgående och `.is-active` istället för modifierare, vilket ger lite kortare och mer lättläst klassnamn utan att tappa tydligheten. Resultatet är en konsekvent namngivning som gör det enkelt att förstå vad en klass tillhör och vad den gör.

### Ikoner

Lucide Icons via CDN – konsistenta SVG-ikoner med `aria-hidden="true"` genomgående.

### JS-rendering av navigationen

Hela navigeringen renderas från JavaScript via `navData`-objektet. Kravet var att menydata inte ska hårdkodas i markup. Jag har tolkat det som att all nav-struktur ritas upp från data, med HTML-filen enbart som tom container.

Instruktionen nämner JSON som ett exempel. Jag valde ett JS-objekt istället eftersom det laddas med ett vanligt `<script>`-tag och är direkt tillgängligt synkront. En JSON-fil kräver `fetch()` och asynkron hantering, vilket hade tillfört komplexitet utan egentligt värde i ett projekt utan build-steg.

 Denna lösningen håller all nav-logik samlad på ett ställe, vilket gör koden lättare att följa.

## Användning av AI

Jag använde Claude Code som ett verktyg under arbetets gång, på ungefär samma sätt som jag använder en erfaren kollega att bolla idéer med.

Strategin, teknikvalet och alla designbeslut fattade jag själv. Jag lät Claude generera grundfilerna utifrån min spec, men drev sedan processen framåt genom att ställa frågor och ifrågasätta lösningarna. Jag bad om förklaringar, alternativ och förbättringsförslag, och itererade på koden tills den uppfyllde mina krav. Jag använde också Claude för att granska min kod och ge feedback på tillgänglighet och semantik.

Jag har gått igenom all kod manuellt, förstått och godkänt varje del, och itererat där resultatet inte mötte mina krav. All kod, semantik och tillgänglighet har jag granskat och validerat aktivt och löpande.

Jag kan förklara och motivera varje del av koden.

## Vad jag hade förbättrat med mer tid

1. **Tangentbordsnavigering i mega-menu** – Piltangenter navigerar mellan kategorier (WCAG 2.1 succescriteria 2.1.1)
2. **CSS transitions för drill-down** – Slide-animation mellan paneler (translateX) för tydligare riktningskänsla
3. **Riktigt logotyp-SVG** – Ersätta textlogotypen med Svedeas faktiska SVG-logotyp
4. **Reduced motion** – Respektera `prefers-reduced-motion` och stänga av animationer
5. **Webbläsarkompatibilitet** – Säkrat stöd för äldre webbläsare samt testat i olika OS och webbläsare (Safari/iOS, Firefox, Edge) för att fånga eventuella rendering- och interaktionsskillnader
6. **`<dialog>`-elementet** – Mobilmenyn är implementerad med `<div role="dialog">` och explicit fokustrapning via JavaScript. Med mer tid hade jag utvärderat och testat det inbyggda `<dialog>`-elementet med `showModal()`, som hanterar fokustrapning och Escape-stängning nativt och är baseline i alla moderna webbläsare sedan 2022
7. **Visuell polish** – Med mer tid hade jag tajtat till det visuella ytterligare: spacing, typografisk hierarki och detaljerna i hover- och fokustillstånd för att ligga närmare Svedeas faktiska design. Jag hade också ersatt Lucide-ikonerna med Svedeas egna ikoner för att matcha varumärket fullt ut.
