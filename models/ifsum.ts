import dayjs from "dayjs"

export const insum = {
	'00':  {
		1: '00',
		2: 'IFCSUM',
		3: 'MANIFEST',
		4: getFileFunction( 'original' ),
		5: '',
		6: '',
		7: getFileCreateTime()
	},
	'01': {
		1: '10',
		2: getVesselCode(),
		3: getVessel(),
		4: '',
		5: getVoyage(),
		7: '',
		8: '',
		9: getSalingDate(),
		10: getDepartPortCode(),
		11: getDepartCode(),
		12: '',
		13: '',
		14: getQuantityNumberOfContainer()
	}
}