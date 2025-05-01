import { Sequelize } from 'sequelize';
import TermsModelSwedish from '../models/termsmodelSwedish.js';


const sequelize = new Sequelize('postgresql://sow_4k5u_user:ptLJEsX3xiLZ7qRt33XJ0Q8GzwcrOfFW@dpg-d09sb8s9c44c73cmlkr0-a.singapore-postgres.render.com/sow_4k5u', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  },
  logging: false
});
const Terms = TermsModelSwedish(sequelize);

const termsContent=[
    "GENOM",
    "genom att klicka på Fakturera nu väljer du att registrera dig enligt informationen du har skrivit in och texten på registreringssidan och villkoren här, och du accepterar samtidigt villkoren här.",
    "Du kan använda programmet GRATIS i 14 dagar.",
    "123 Fakturera är så enkelt och självförklarande att chansen att du behöver support är minimal, men om du skulle behöva support finns vi här för dig, med vårt kontor bemannat större delen av dygnet. Efter provperioden fortsätter prenumerationen och kostar 99 kr exklusive moms per månad, vilket faktureras årligen. Om du inte vill behålla programmet avslutar du bara provperioden genom att meddela oss innan 14 dagar från registreringen.",
    "Du har naturligtvis rätt att avsluta användningen av programmet utan kostnad genom att meddela oss per e-post innan 14 dagar från registreringen att du inte vill fortsätta med programmet, och du betalar då naturligtvis ingenting.",
    "Om vi ​​inte får ett sådant meddelande från dig inom 14 dagar från registrering, då kan beställningen av naturliga skäl inte ändras. Med registrering avses datum och tidpunkt då du valde att trycka på knappen Fakturera nu.",
    "Fakturering sker för ett år i taget.",
    "Priset för 123 Fakturer (erbjudandepris 99 kr per månad / ordinarie pris 159 kr per månad) är för årsavgiften Start för ett års användning av programmet.",
    "(Vid användning av erbjudandepriset 99 kr beräknas ettårsperioden från registrering.)",
    "Alla priser är exklusive moms.",
    "Erbjudande, Lagerstyrning, Medlemsfakturering, Fleranvändarversion och engelsk utskrift är (eller kan vara) tilläggsmoduler som kan beställas senare.",
    "Förmedling, såväl som fakturering, kan ske från K-Soft Sverige AB, Box 2826, 187 28 Täby. I framtiden kan vi komma att välja att samarbeta med ett annat företag för t.ex. förmedling och fakturering. Kundrelationen är dock hos oss. Betalningen sker till det företag som fakturan kommer ifrån.",
    "Årsavgiften är löpande, men om du inte vill fortsätta använda programmet behöver du bara meddela detta trettio dagar före starten av nästa ettårsperiod.",
    "Introduktionserbjudandet (99 kr per månad) gäller årsavgiften Start för det första året. Efter det första året faktureras ordinarie pris, vilket för närvarande är för årsavgift Start etthundrafemtionio kronor per månad, för årsavgift Fjärrkontroll trehundra kronor per månad och för årsavgift Pro trehundratrettiotre kronor per månad. Efter ett år faktureras årsavgiften för Fjärrkontroll som standard, men du kan välja Start eller Pro genom att meddela detta när som helst före förfallodagen.",
    "Om du väljer att behålla programmet genom att inte meddela oss via e-post inom 14 dagar efter registrering att du inte vill fortsätta med programmet, accepterar du att du betalar fakturan för din beställning. Utebliven betalning av faktura eller sen betalning ger inte rätt att avbryta beställningen. Vi hjälper dig gärna med logotyp till självkostnadspris.",
    "Licens för användning av 123 Fakturera säljs naturligtvis i enlighet med gällande lagar.",
    "För att enklare kunna hjälpa dig och ge dig support, samt för att följa lagarna, måste vi av naturliga skäl lagra dina uppgifter.",
    "I samband med lagring av information kräver lagen att vi lämnar följande information till dig:",
    "Om du beställer som privatperson har du rätt att avbryta enligt lagen. Dina uppgifter lagras så att vi kan hjälpa dig etc. Vi kommer att använda dem för att kunna hjälpa dig om du behöver hjälp, följa lagarna gällande bokföring etc. När det sker uppgraderingar och liknande kan vi komma att skicka dig erbjudanden och liknande om våra produkter och tjänster via e-post eller liknande. Du kan komma att kontaktas via e-post, post och telefon. Om du inte vill bli kontaktad är det bara att skicka ett mejl till oss om det.",
    "Du kan när som helst begära att inte få information om uppgraderingar skickad via e-post, brev eller liknande, och det kommer vi naturligtvis inte att göra. Du skickar en sådan begäran till oss via e-post, vanlig post eller liknande.",
    "Av naturliga skäl måste vi lagra, bearbeta och flytta dina uppgifter. Din information lagras tills vidare. Du ger oss tillstånd att lagra, bearbeta och flytta dina uppgifter, samt att skicka dig erbjudanden och liknande via e-post, brev och liknande. På grund av hur det fungerar med programvara behöver tillstånd även ges till andra parter. Tillståndet beviljas därför till oss, såväl som till de företag och/eller person(er) som äger programvaran, källkoden, webbplatsen och liknande. Det ges även till nuvarande och framtida företag som ägs och/eller kontrolleras av en eller flera av dem som för närvarande äger och/eller kontrollerar oss. Det ges även till nuvarande och framtida företag som ägs och/eller kontrolleras av en eller flera av dessasom för närvarande äger och/eller kontrollerar företagen (om några), som äger eller kommer att äga programvaran, källkoden, webbplatsen och liknande. Den ges också till nuvarande och framtida personer (om några) som äger eller kommer att äga programvaran, källkoden, webbplatsen och liknande. Detta gäller både nuvarande och framtida produkter och tjänster. Den ges också till ett annat företag (som K-Soft Sverige AB), som vi kan använda för att skicka/sälja produkter, uppgraderingar och liknande, antingen genom förmedling eller på annat sätt.",
  
  "Du har naturligtvis rätt att begära åtkomst till, ändring och radering av den information vi har om dig. Du har också rätt att begära begränsning av databehandling, och att invända mot databehandling och rätt till dataportabilitet. Du har rätt att klaga till tillsynsmyndigheten. Du hittar mer juridisk information om oss här. Irlands lagar är tillämpliga. Att göra en beställning är naturligtvis helt frivilligt. Vi använder naturligtvis ingen automatiserad profilering eller beslutsfattande.",
  "Om du vill kontakta oss, vänligen använd informationen på denna webbplats.",
  "Klicka på Fakturera nu för att registrera dig enligt den information du har angett och villkoren här. (Datum och tid för registrering matas in automatiskt i våra register.)",
  "Vår erfarenhet är att våra kunder är mycket nöjda med hur vi arbetar och hoppas och tror att detta också kommer att vara din upplevelse.",
  "Ha en bra dag!"
  ]

async function seedTerms() {
    try {
      await sequelize.authenticate();
      console.log('Database connected...');
  
      await Terms.sync({ force: true }); // WARNING: Drops table if exists
      console.log('Terms table synced (dropped and recreated).');
  
      const insertData = termsContent.map(term => ({ content: term }));
      await Terms.bulkCreate(insertData);
      console.log('Terms seeded successfully.');
  
      await sequelize.close();
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Seeding failed:', error);
    }
  }
  
  seedTerms();