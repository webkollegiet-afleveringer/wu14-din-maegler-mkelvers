# Opgavebeskrivelse

Din Mæglers nye website skal opsættes sådan, at det er i overensstemmelse med det udleverede design og kravspecifikation.

Din opgave bliver at kode og programmere sitets opsætning og funktionalitet efter et udleveret design (figma fil) og med de indholdsdata, der er til rådighed fra det web-baserede API.

Som udgangspunkt skal du følge designet når du koder sitet, men kunden er modtagelig for ændringer i designet, hvis disse kan argumenteres til kundens fordel.

## Tekniske krav

Sitet skal som minimum opbygges i HTML, prekompileret CSS og Javascript. Du må gerne anvende frameworks eller biblioteker inden for de tre teknologier. Sitet skal opfylde de gængse standarder inden for semantisk, korrekt kode og søgemaskine optimering (SEO).

Sitet skal indeholde fejlhåndtering på alle relevante fejl, så brugeren får en fejlmeddelelse der tager hensyn til sitets indhold.

Der skal være validering på alle formularer/inputelementer.

## Projektdokumentation

Du skal udarbejde en projektdokumentation sammen med opgaveløsningen. projektdokumentation skal som minimum indeholde følgende:

- Angivelse af de url adresser, brugernavne og passwords der er nødvendige for at din lærer kan se opgaven.
- Redegørelse for teknologi-stack.
- Redegørelse for oprindelsen af evt. tredjepartskode anvendt i opgaveløsningen.
- Argumentation for de valg du har truffet under løsningen af opgaven.
- Vurdering af din egen indsats og gennemførelse af opgaven (hvad gik godt / skidt).
- Fremhævelse af eventuelle særlige punkter til bedømmelse.

Hvis du bruger et projektstyrings værktøj som ikke er github projects (Trello eller lign.) kan du med fordel indsætte et link til dit projekt i rapporten. Du kan også med fordel indsætte daglige screenshots af dit github projects eller trello-board, som kan vise din progression i arbejdet.

Øverst i rapporten skal fremgå:

- Opgavens navn samt dit navn og holdnummer
- URL til GitHub repository samt netlify
- Brugernavn/adgangskoder

## Kravspecifikation

På de følgende sider gives et overblik over krav til websitets layout, funktionalitet og indhold. Vær særlig opmærksom på detaljer i layout filen.

Hvis du oplever elementer i opgaven, som ikke er vist i designet eller nævnt i kravspecifikationen, skal du antage, at det skal laves og dermed er det op til dig at beslutte, hvad du vil gøre og hvordan du vil gøre det.

### Generelle krav

- Sitet bygges i standardmål efter layoutet
- Sitet skal ved hjælp af automatiseret deployment udgives på fx Netlify.
- Ekstraopgave: Du må gerne tilføje responsiv funktionalitet på sitet så det også kan vises på tablet eller telefon.

### Faste elementer på alle sider

- Header med logo og navigation, kontaktoplysninger (i form af e-mail og telefon) samt login-mulighed.
- Ved klik på login vises loginsiden – når en bruger er logget ind skiftes login-knappen til log ud.
- Menu-punktet "Mine favoritter" vises kun når en bruger er logget ind.
- Footer med logo, samt boks med kontaktoplysninger, quick links og "Medlem af Dansk Mægler Sammenslutning. Herunder et bånd med credits til skaberen af layoutet.

### Forsiden

#### Søgefunktionalitet
Øverst på forsiden vises en søgefunktionalitet, hvor det er muligt at fritekstsøge i alle boliger. Ved søgning vises siden med en listevisning af boliger, samt oplysning om hvilket kriterie der er søgt efter.

#### Vi har fulgt danskerne hjem…
Statisk blok med information om Din Mægler.

#### Udvalgte boliger
Her vises fire (de fire første) boliger. Ved klik på knappen vis alle boliger, skiftes til siden med listevisning af alle boliger.
Ekstraopgave: I stedet for de fire første boliger, vises fire tilfældige boliger

#### Tilmeld nyhedsbrev
Muglighed for at tilmelde nyhedsbrev. (endpoint oprettes på api'et)
Ekstraopgave: Tilføj en mulighed for at framelde sig nyhedsbrevet. Du bestemmer selv hvor og hvordan.

#### Medarbejdere
I denne sektion vises tre medarbejdere. Ved klik på en medarbejders kort, skiftes til siden med medarbejder-detaljer. Ved klik på knappen "se alle mæglere" skiftes til siden med oversigt over alle medarbejdere.
Ekstraopgave: I stedet for de tre første medarbejdere, vises tre tilfældige medarbejdere

#### Hold dig opdateret…
Statisk sektion med reklame.

### Boliger til salg

På denne side vises en liste over alle boliger til salg. Øverst skal der være mulighed for at filtrere boliger efter type (villa, ejerlejlighed etc.), ligesom der skal være mulighed for at vise boliger i et bestemt pris-leje, ved at bruge pris-interval slideren til at angive en minimum- og en maksimumpris.

Når en bruger klikker på en bolig vises boligen i detaljevisning.

Hvis en bruger er logget ind, vises det lille hjerte-ikon i øverste højre hjørne af billedet. Hvis brugeren har markeret boligen som en favorit, vises hjertet udfyldt, hvis ikke, vises hjertet i outline. Ved at klikke på hjertet skal det være muligt for brugeren at enten tilføje eller fjerne boligen fra sin favoritliste.

### Bolig – detaljevisning

På detaljesiden vises øverst et stort billede af boligen.

Herunder vises et bånd med adresse og pris samt knapper til henholdsvis galleri, plantegning og visning på kort. Hvis en bruger er logget ind, vises der også i dette bånd et hjerte, og brugeren får dermed mulighed for at tilføje boligen til sine favoritter. Hvis en bruger allerede har boligen på sin favorit-liste vises hjertet udfyldt, som beskrevet ovenfor. Ved at klikke på hjertet skal det være muligt for brugeren at enten tilføje eller fjerne boligen fra sin favoritliste.

Under den vandrette streg vises alle boligens detaljer.

Nederst på siden vises boligens beskrivelse samt den ansvarlige mægler. Det skal være muligt at komme til detaljesiden om den ansvarlige mægler.

#### Overlay – slideshow
Ved klik på galleri-ikonet vises et overlay med et slideshow af de billeder som er på ejendommen.

#### Overlay – plantegning
Ved klik på plantegnings-ikonet vises et overlay med boligens plangtegning.

#### Overlay – kort
Ved klik på pin-ikonet vises et overlay med boligens placering på et kort. Det er OK at bruge et statisk billede.
Ekstraopgave: Tilføj et dynamisk kort, som bruger boligens lat og long properties til at vise boligens placering på et rigtigt kort. (OBS: koordinaterne der er tastet ind på boligerne er i det generelle område som boligens fiktive adresse ligger i).

Under slideshow/plantegning/kort vises de tre (eller fire) ikoner, som også vises på detaljesiden. Også her skal en bruger som er logget ind, have mulighed for at tilføje eller fjerne boligen fra sine favoritter ved at klikke på hjertet.

### Mine favoritboliger

Når en bruger er logget ind, skal det være muligt at få vist siden. Siden viser en listevisning over de boliger brugeren har markeret som favoritter. Hvis brugeren ikke har nogle favoritter, vises en passende meddelelse samt et link til oversigten over boliger til salg.

Ved klik på boligen vises boligen på detaljesiden.
Ved klik på knappen "fjern fra favoritter" fjernes boligen fra brugerens favoritliste.

### Medarbejdere

På denne side vises en liste over medarbejdere. Ved klik på en medarbejderes vises detaljesiden om den pågældende medarbejder.

### Kontakt en medarbejder (detaljesiden)

På denne side kan man få lidt mere at vide om de medarbejdere som er ansat hos Din Mægler. Via kontakt formularen kan man sende en mail til den pågældende medarbejder. Ved tryk på knappen send besked, skal de indtastede data (hvis formularen validerer) vises i loggen.

Der er mulighed for fritekst-søgning i alle ejendomme til salg i søgeformularen. Brugeren videresendes til listevisningen af boliger til salg, hvor søgeresultatet vises.

### Kontakt os

På denne side er det muligt at sende en mail til kontoret. Ved tryk på knappen send besked, skal de indtastede data (hvis formularen validerer) vises i loggen.

Under kontakt formularen vises placeringen af Roskilde kontoret på et kort. Her må du gerne bruge et statisk billede.

### Log ind

På denne side vises en log ind formular.

De tre felter, hvor man kan bruge Google, Facebook eller Twitter vises blot som muligheder, da api'et ikke understøtter Open Authentication. Pynt gerne disse knapper med ikoner.

Nederst i formularen er et link som sender brugeren videre til registrer bruger.

### Registrer bruger

I denne formular er der mulighed for at oprette en bruger.

### 404

Hov! Denne side kan du bruge som fallback i forbindelse med fejl-håndtering mv. hvis du har brug for det.

Footeren skal selvfølgelig være den samme som på de andre sider.
