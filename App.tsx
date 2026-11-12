
import React from 'react';
import { View,Text,StyleSheet,FlatList } from 'react-native'; 

type Evenement ={
  ID: string,
  Titre: string,
  Categorie: string,
  Capacite: number,
  Inscrits: number,
};
const evenement: Evenement[]=[
  {ID:'E01' ,Titre:'Atelier React' ,Categorie:'Atelier' ,Capacite:25 ,Inscrits:25},
  {ID:'E02' ,Titre:'Conference IA' ,Categorie:'Conference' ,Capacite:70 ,Inscrits:52},
  {ID:'E03' ,Titre:'Securite mobile' ,Categorie:'Atelier' ,Capacite:20 ,Inscrits:17},
  {ID:'E04' ,Titre:'Design UI' ,Categorie:'Atelier' ,Capacite:18 ,Inscrits:9},
  {ID:'E05' ,Titre:'Forum projets' ,Categorie:'Rencontre' ,Capacite:50 ,Inscrits:49},
  {ID:'E06' ,Titre:'Decouverte Git' ,Categorie:'Atelier' ,Capacite:24 ,Inscrits:24},
];

function placesRestantes(e:Evenement):number{
  return Math.max(0,e.Capacite-e.Inscrits);
}


function  statutEvenement(e:Evenement):string{
  if (placesRestantes(e)===0) {
    return "Complet";
  }
  else if (placesRestantes(e)<=3 ){
    return "Presque complet";
  
  }else{
    return "Ouvert"
  }
};

function NombreTotalEvenement():number{
  return evenement.length;
};

const EvenementsComplets=evenement.filter((e)=>placesRestantes(e)===0)
function NombreEvenementComplet():number{
  return EvenementsComplets.length;
};

const EvenementAvecPlace=evenement.filter((e)=>placesRestantes(e)>0);
function NombreEvenementAvecPLace():number{
  return EvenementAvecPlace.length;
};
function sommePlacesRestantes():
number{
  return evenement.reduce((total, e)=> total+placesRestantes(e),0);
}

const AteliersDisponibles=evenement.filter((e)=>e.Categorie==="Atelier" && placesRestantes(e)>0);


type BadgeProps={
  statut:string,
};
function BadgeEtat({statut}:BadgeProps){
  let couleur="";
  if (statut==="Complet"){
    couleur="red";
  }else if (statut==="Presque complet"){
    couleur="orange";
  }else{
    couleur ="green";
  }
  return(
    <View style={{backgroundColor: couleur,
      padding:8,
      borderRadius: 10
    }}>
      <Text>{statut}</Text>
    </View>
  );
}

type CarteProps={
  evenement:Evenement,
}

  function CarteEvenement({ evenement }: CarteProps) {
  return (
    <View style={styles.carte}>
      <Text>{evenement.Titre}</Text>

      <Text>{evenement.Categorie}</Text>

      <Text>Places restantes : {placesRestantes(evenement)}</Text>

      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}

type  BlocProps={
  libelle:string,
  nombre:number,

}
function BlocStatistique({libelle,nombre}:BlocProps) {
  return (
    <View style={styles.bloc}>
      <Text>{libelle}</Text>
      <Text>{nombre}</Text>
    </View>
  );
}
const mode='ateliers';
const evenementsAffiches=
mode === 'ateliers'? evenement.filter(
  (e)=> e.Categorie=='Atelier'&& placesRestantes(e)>0
): evenement;

export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.titre}>
        CampusAgenda
      </Text>

      <Text style={styles.sousTitre}>
        Événements du campus
      </Text>

      <View style={styles.statsContainer}>

        <BlocStatistique
          libelle="Événements"
          nombre={NombreTotalEvenement()}
        />

        <BlocStatistique
          libelle="Complets"
          nombre={NombreEvenementComplet()}
        />

        <BlocStatistique
          libelle="Avec places"
          nombre={NombreEvenementAvecPLace()}
        />

        <BlocStatistique
          libelle="Places libres"
          nombre={sommePlacesRestantes()}
        />

      </View>

      <Text style={styles.titreMode}>
        {mode === 'ateliers'
          ? 'Tous les événements'
          : 'Ateliers disponibles'}
      </Text>

      <FlatList
        data={evenementsAffiches}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        keyExtractor={(item) => item.ID}
        ListEmptyComponent={
          <Text style={styles.messageVide}>
            Aucun événement à afficher.
          </Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  titre: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  sousTitre: {
    fontSize: 16,
    marginBottom: 20,
  },

  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  titreMode: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  carte: {
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#eeeeee',
  },

  bloc: {
    width: '48%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#eeeeee',
  },

  messageVide: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});

