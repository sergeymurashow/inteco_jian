import { Any, IfsumParsed } from "src/DocsParse/classes/IfsumParser";

import VoyageRecord from "./VoyageRecord";
import ContainersOnVoyage from "./ContainersOnVoyage";
import Validator from "./Validator";

export default async ( ifsumParsed: IfsumParsed ) => {
	const voyageGetter = new VoyageRecord( ifsumParsed.generalData.voyageNumber )
	const voyageLink = await voyageGetter.getVoyageRecordId()

	const containersGetter = new ContainersOnVoyage( voyageLink )
	const containersWithManifest = await containersGetter.getContainers()

	const validator = new Validator()
	validator.setIfsum( ifsumParsed )
	validator.setManifest( containersWithManifest )
	const nonValid = validator.validate()

	return nonValid

}