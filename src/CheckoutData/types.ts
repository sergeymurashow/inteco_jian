import { Any } from "src/DocsParse/classes/IfsumParser"

export type VoyageLink = {
	catalogId: string
	recordId: string
}

export type Filters = {
	fieldId: string
	value: Any
}[]