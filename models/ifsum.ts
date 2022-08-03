import dayjs from "dayjs"
import { ifsumData } from "src/utils/functions"

export const insum = {
	'00':  {
		1: '00',
		2: 'IFCSUM',
		3: 'MANIFEST',
		4: ifsumData.getFileFunction( 'original' ),
		5: '',
		6: '',
		7: ifsumData.getFileCreateTime()
	},
	'01': {
		1: '10',
		2: ifsumData.getVesselCode(),
		3: ifsumData.getVessel(),
		4: '',
		5: ifsumData.getVoyage(),
		7: '',
		8: '',
		9: ifsumData.getSalingDate(),
		10: ifsumData.getDepartPortCode(),
		11: ifsumData.getDepartCode(),
		12: '',
		13: '',
		14: ifsumData.getQuantityNumberOfContainer()
	}
}