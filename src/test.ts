// let test = {
// 	'a': 'HS Code',
// 	'b': 'H.S. Code',
// 	'c': 'HS'
// }

// let reg = /H.*?S.*?(Code)*/

// let t1 = test.a.match( reg )
// let t2 = test.b.match( reg )
// let t3 = test.c.match( reg )

import dotenv from 'dotenv'
import Axios from 'axios'
// import { collect } from '../files/collect'
import dayjs, { Dayjs } from 'dayjs'


let data = {
	"user": {
		"id": null
	},
	"event": {
		"id": "16",
		"type": "$webRequests",
		"async": false
	},
	"script": {
		"id": "52"
	},
	"method": "POST",
	"query": {

	},
	"body": {
		"booking": {
			"bookingId": "INJIAN00000245",
			"voyageNumber": "INT008",
			"pkgs": 1760,
			"packType": "BAGS",
			"gWeight": 44176,
			"desc": "DEXTROSE MONOHYDRATE \nFREIGHT COLLECT",
			"shipper": "QINGYUAN FOODSTUFF CO.,LTD.\nNO.39,YIBO ROAD,YISHUI,SHANDONG,CHINA",
			"consignee": "<<FLYTEX>>LLC\nQUARTER 2, 25, OFFICE 2, THE\nTERRITORY SOUTH PART OF\nINDUSTRIAL PARK GORELOVO,\nLOMONOSOVSKIY DISTRICT,\nLENINGRAD REGION, RUSSIA",
			"notifyParty": "AIS RUSSIA LLC\nRUSSIA, SAINT-PETERSBURG\nPOM. NO 28,29H, LIT A, K.1, STR.\nVARSHAVSKAYA, 9,ST.PETERSBURG, RUSSIA, 196128\n8(812)309-95-55\nCSD@ATLANTIC-INTERMODAL.COM\nSOLOVYOV@ATLANTIC-INTERMODAL.COM",
			"mark": "N/M",
			"hs": "HS CODE 1702300",
			"containers": [
				{
					"mension": "20",
					"type": "GP",
					"vol": "1",
					"number": "TRZU2212459",
					"seal": "P10167",
					"packages": 20,
					"gWeight": 24300,
					"tWeight": 2100,
					"cbm": 24,
					"freight": "FREIGHT COLLECT",
					"owner": "SOC"
				}
			]
		}
	},
	"cookies": {

	},
	"headers": {
		"company": "123",
		"content-type": "application/json",
		"user-agent": "PostmanRuntime/7.29.0",
		"accept": "*/*",
		"postman-token": "01815e40-6de5-49a6-87a4-2371fe12df7c",
		"host": "lk.intecolines.ru:8055",
		"accept-encoding": "gzip, deflate, br",
		"connection": "keep-alive",
		"content-length": "1208",
		"cookie": "connect.sid=s%3AbCaTJGtMGN3kBQMi-mZktr8vI0XJZl1M.RyX3bOZW9sWiLJQ8yFkeaM04vBsZ4dtqgtl8yCwiCsI"
	},
	"url": "/api/webrequest/testSpace2"
}

let voyageNumber = data.body.booking.voyageNumber

let voyages = [
	{
		"id": "13",
		"catalogId": "79",
		"title": "INT008 ",
		"values": {
			"2": "INT008 ",
			"3": [],
			"9": [
				{
					"sectionId": "14",
					"catalogId": "74",
					"catalogTitle": "VESSELS",
					"catalogIcon": "content-11",
					"recordId": "3",
					"recordTitle": "SHUN YUE 19",
					"recordValues": {
						"2": "SHUN YUE 19",
						"3": "489"
					},
					"isRemoved": false
				}
			],
			"16": [
				{
					"sectionId": "14",
					"catalogId": "112",
					"catalogTitle": "PO",
					"catalogIcon": "content-11",
					"recordId": "2",
					"recordTitle": "QINDAO",
					"isRemoved": false
				}
			],
			"17": "2022-06-23T11:00:00.000Z",
			"18": "2022-06-24T11:00:00.000Z",
			"20": [
				{
					"sectionId": "14",
					"catalogId": "112",
					"catalogTitle": "PO",
					"catalogIcon": "content-11",
					"recordId": "1",
					"recordTitle": "VOSTOCHNY",
					"isRemoved": false
				}
			],
			"21": "2022-06-29T11:00:00.000Z",
			"22": "2022-06-30T11:00:00.000Z",
			"25": [],
			"30": ""
		}
	},
	{
		"id": "25",
		"catalogId": "79",
		"title": "INT008N",
		"values": {
			"2": "INT008N",
			"3": [],
			"9": [
				{
					"sectionId": "14",
					"catalogId": "74",
					"catalogTitle": "VESSELS",
					"catalogIcon": "content-11",
					"recordId": "7",
					"recordTitle": "HUA DONG 88",
					"recordValues": {
						"2": "HUA DONG 88",
						"3": "665"
					},
					"isRemoved": false
				}
			],
			"16": [
				{
					"sectionId": "14",
					"catalogId": "112",
					"catalogTitle": "PO",
					"catalogIcon": "content-11",
					"recordId": "1",
					"recordTitle": "VOSTOCHNY",
					"isRemoved": false
				}
			],
			"17": "2022-07-20T11:00:00.000Z",
			"18": "2022-07-21T11:00:00.000Z",
			"20": [
				{
					"sectionId": "14",
					"catalogId": "112",
					"catalogTitle": "PO",
					"catalogIcon": "content-11",
					"recordId": "3",
					"recordTitle": "NINGBO",
					"isRemoved": false
				}
			],
			"21": "2022-07-26T11:00:00.000Z",
			"22": "2022-07-27T11:00:00.000Z",
			"25": [],
			"30": ""
		}
	}
]

let t = voyages.filter( f => f.values[2] === voyageNumber )

