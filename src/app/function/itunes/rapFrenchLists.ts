export type RapList = {
	label: string
	id: string
}

// Sons récents du rap français (2020-2024)
export const recentRapFrench: RapList[] = [
	{ label: "Niska", id: "niska-recent" },
	{ label: "PNL", id: "pnl-recent" },
	{ label: "Damso", id: "damso-recent" },
	{ label: "Gazo", id: "gazo-recent" },
	{ label: "Naps", id: "naps-recent" },
	{ label: "Koba LaD", id: "koba-lad-recent" },
	{ label: "Orelsan", id: "orelsan-recent" },
	{ label: "Bigflo & Oli", id: "bigflo-oli-recent" },
	{ label: "Lomepal", id: "lomepal-recent" },
	{ label: "Vald", id: "vald-recent" },
	{ label: "SCH", id: "sch-recent" },
	{ label: "Laylow", id: "laylow-recent" },
	{ label: "Dinos", id: "dinos-recent" },
	{ label: "Alpha Wann", id: "alpha-wann-recent" },
	{ label: "Nekfeu", id: "nekfeu-recent" },
	{ label: "Luv Resval", id: "luv-resval-recent" },
	{ label: "Freeze Corleone", id: "freeze-corleone-recent" },
	{ label: "Josman", id: "josman-recent" }
]

// Classiques du rap français (1990-2010)
export const classicRapFrench: RapList[] = [
	{ label: "IAM", id: "iam-classic" },
	{ label: "NTM", id: "ntm-classic" },
	{ label: "MC Solaar", id: "mc-solaar-classic" },
	{ label: "Assassin", id: "assassin-classic" },
	{ label: "Lunatic", id: "lunatic-classic" },
	{ label: "Fonky Family", id: "fonky-family-classic" },
	{ label: "Sniper", id: "sniper-classic" },
	{ label: "113", id: "113-classic" },
	{ label: "Sage Poeta", id: "sage-poeta-classic" },
	{ label: "Oxmo Puccino", id: "oxmo-puccino-classic" },
	{ label: "La Rumeur", id: "la-rumeur-classic" },
	{ label: "TTC", id: "ttc-classic" },
	{ label: "Saïan Supa Crew", id: "saian-supa-crew-classic" },
	{ label: "Mafia K'1 Fry", id: "mafia-k1-fry-classic" },
	{ label: "Scred Connexion", id: "scred-connexion-classic" }
]



// Toutes les listes disponibles
export const allRapFrenchLists = {
	recent: recentRapFrench,
	classic: classicRapFrench,
} 