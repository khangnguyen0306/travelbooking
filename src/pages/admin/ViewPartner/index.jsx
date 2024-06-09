import React from 'react';
import "./ViewPartner.scss";
import { Table, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Date of birth',
        dataIndex: 'dob',
        key: 'dob',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, record) => (
            <Tag >
                {record.status}
            </Tag>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <a>Active</a>
        ),
    },
];

const data = [
    {
        "name": "Wilbur Huels",
        "dob": "1950-11-13T22:09:58.771Z",
        "address": "Guaynabo",
        "email": "Mariane.Dach39@yahoo.com",
        "phone": "533-910-9858",
        "status": false,
        "id": "1"
    },
    {
        "name": "Milton Kohler",
        "dob": "1954-01-12T14:15:24.102Z",
        "address": "San Juan",
        "email": "Zackary.Wiza@yahoo.com",
        "phone": "649-631-0237",
        "status": false,
        "id": "2"
    },
    {
        "name": "Elijah Ryan",
        "dob": "1989-01-31T23:49:56.232Z",
        "address": "South Valley",
        "email": "Lorenzo_Kris@hotmail.com",
        "phone": "507-952-8257",
        "status": false,
        "id": "3"
    },
    {
        "name": "Gwen Wuckert",
        "dob": "2006-01-06T02:21:16.411Z",
        "address": "Cleveland",
        "email": "Marc22@yahoo.com",
        "phone": "540-839-4434",
        "status": false,
        "id": "4"
    },
    {
        "name": "Mrs. Eula Wunsch",
        "dob": "1971-04-11T08:38:47.410Z",
        "address": "Hayward",
        "email": "Shania81@hotmail.com",
        "phone": "544-842-8810",
        "status": false,
        "id": "5"
    },
    {
        "name": "Lucia Lemke",
        "dob": "1969-08-01T18:34:06.933Z",
        "address": "Tampa",
        "email": "Aaliyah_OKeefe@yahoo.com",
        "phone": "529-226-2657",
        "status": false,
        "id": "6"
    },
    {
        "name": "Julio Schmitt",
        "dob": "2006-05-12T15:17:58.056Z",
        "address": "Pleasanton",
        "email": "Annabelle88@yahoo.com",
        "phone": "342-659-3962",
        "status": false,
        "id": "7"
    },
    {
        "name": "Amber Hegmann",
        "dob": "2001-02-04T20:10:23.816Z",
        "address": "Cypress",
        "email": "Luella.Kuhlman61@hotmail.com",
        "phone": "687-637-8610",
        "status": false,
        "id": "8"
    },
    {
        "name": "Maureen Hansen MD",
        "dob": "1946-11-06T19:23:54.416Z",
        "address": "Washington",
        "email": "Frankie.Lehner66@gmail.com",
        "phone": "946-733-1180",
        "status": false,
        "id": "9"
    },
    {
        "name": "Lila Bruen",
        "dob": "2003-04-07T06:54:37.103Z",
        "address": "West Seneca",
        "email": "Reece.Quitzon28@hotmail.com",
        "phone": "222-550-8274",
        "status": false,
        "id": "10"
    },
    {
        "name": "Fannie Rice",
        "dob": "1987-09-07T07:34:51.513Z",
        "address": "Wylie",
        "email": "Trever_Pouros74@yahoo.com",
        "phone": "662-617-1744",
        "status": false,
        "id": "11"
    },
    {
        "name": "Samuel Frami",
        "dob": "1950-03-10T09:53:55.850Z",
        "address": "Dayton",
        "email": "Esmeralda73@gmail.com",
        "phone": "371-957-4185",
        "status": false,
        "id": "12"
    },
    {
        "name": "Miss Antonio Ward",
        "dob": "1979-04-10T05:48:40.797Z",
        "address": "Normal",
        "email": "Preston_Koss44@gmail.com",
        "phone": "317-371-8659",
        "status": false,
        "id": "13"
    },
    {
        "name": "Dr. Hannah Kirlin",
        "dob": "1972-08-08T21:12:14.230Z",
        "address": "Minneapolis",
        "email": "Paul.Rolfson92@gmail.com",
        "phone": "303-442-5648",
        "status": false,
        "id": "14"
    },
    {
        "name": "Ms. Alfred Lesch",
        "dob": "1979-11-09T02:31:53.745Z",
        "address": "Sarasota",
        "email": "Reggie33@gmail.com",
        "phone": "591-822-3058",
        "status": false,
        "id": "15"
    },
    {
        "name": "Irvin Predovic",
        "dob": "2001-09-16T09:12:36.139Z",
        "address": "Austin",
        "email": "Glennie76@hotmail.com",
        "phone": "657-866-4703",
        "status": false,
        "id": "16"
    },
    {
        "name": "Leslie Marks",
        "dob": "2001-09-21T02:16:15.217Z",
        "address": "Elizabeth",
        "email": "Larry13@gmail.com",
        "phone": "703-924-0121",
        "status": false,
        "id": "17"
    },
    {
        "name": "Ramiro Ernser V",
        "dob": "1984-11-05T03:39:19.511Z",
        "address": "Warwick",
        "email": "Dana70@hotmail.com",
        "phone": "239-863-9580",
        "status": false,
        "id": "18"
    },
    {
        "name": "Rosemarie Quigley",
        "dob": "1995-09-10T16:09:41.048Z",
        "address": "Jackson",
        "email": "Leta_Crist80@gmail.com",
        "phone": "460-490-5730",
        "status": false,
        "id": "19"
    },
    {
        "name": "Mr. Carroll Homenick",
        "dob": "1967-05-14T18:27:49.197Z",
        "address": "Naperville",
        "email": "Dee.Schinner52@hotmail.com",
        "phone": "842-418-7207",
        "status": false,
        "id": "20"
    },
    {
        "name": "Rosa Emmerich",
        "dob": "1959-04-20T10:57:36.128Z",
        "address": "Chicago",
        "email": "Kasandra_Ratke62@gmail.com",
        "phone": "820-642-1890",
        "status": false,
        "id": "21"
    },
    {
        "name": "Maurice Bergnaum Sr.",
        "dob": "1944-02-14T15:15:16.437Z",
        "address": "DeKalb",
        "email": "Ricky_Littel94@yahoo.com",
        "phone": "591-418-3525",
        "status": false,
        "id": "22"
    },
    {
        "name": "Mr. Sophie Mills PhD",
        "dob": "1991-03-19T05:10:39.631Z",
        "address": "Stratford",
        "email": "Asha.Mann23@yahoo.com",
        "phone": "463-445-1017",
        "status": false,
        "id": "23"
    },
    {
        "name": "Kerry Murazik",
        "dob": "1951-07-24T02:38:00.090Z",
        "address": "New Brunswick",
        "email": "Velda.Huel55@yahoo.com",
        "phone": "982-409-5210",
        "status": false,
        "id": "24"
    },
    {
        "name": "Julia Hodkiewicz PhD",
        "dob": "1968-10-04T00:57:51.108Z",
        "address": "Vacaville",
        "email": "Brown.Cummerata@gmail.com",
        "phone": "239-887-8690",
        "status": false,
        "id": "25"
    },
    {
        "name": "Rudy Auer",
        "dob": "1945-08-13T10:13:49.379Z",
        "address": "Jacksonville",
        "email": "Erik29@gmail.com",
        "phone": "873-321-8895",
        "status": false,
        "id": "26"
    },
    {
        "name": "Hubert Herman",
        "dob": "1986-06-09T10:40:29.982Z",
        "address": "Tacoma",
        "email": "Trever_Ernser81@hotmail.com",
        "phone": "934-974-6195",
        "status": false,
        "id": "27"
    },
    {
        "name": "Arthur Collier",
        "dob": "1988-06-09T22:07:24.975Z",
        "address": "The Woodlands",
        "email": "Cletus_Kuhn@gmail.com",
        "phone": "735-999-3671",
        "status": false,
        "id": "28"
    },
    {
        "name": "Miss Bradley Lemke",
        "dob": "1987-04-11T20:50:23.967Z",
        "address": "Lauderhill",
        "email": "Eliezer_Cartwright45@gmail.com",
        "phone": "692-593-5139",
        "status": false,
        "id": "29"
    },
    {
        "name": "Lester Bailey",
        "dob": "1988-01-25T16:45:03.699Z",
        "address": "Richland",
        "email": "Phoebe95@hotmail.com",
        "phone": "664-416-5602",
        "status": false,
        "id": "30"
    },
    {
        "name": "Enrique Lind",
        "dob": "1956-06-22T07:39:25.154Z",
        "address": "Redding",
        "email": "Lonny_Wilkinson87@gmail.com",
        "phone": "759-950-3976",
        "status": false,
        "id": "31"
    },
    {
        "name": "Ms. Laurence Labadie",
        "dob": "1945-09-13T23:12:21.176Z",
        "address": "Port Orange",
        "email": "Clair77@hotmail.com",
        "phone": "861-495-7771",
        "status": false,
        "id": "32"
    },
    {
        "name": "Sherri Dibbert",
        "dob": "1960-05-04T23:35:44.716Z",
        "address": "Kearny",
        "email": "Jeremie_OConnell@hotmail.com",
        "phone": "282-778-3324",
        "status": false,
        "id": "33"
    },
    {
        "name": "Rosa Terry",
        "dob": "2002-08-23T21:46:57.646Z",
        "address": "Enid",
        "email": "Deanna.Pollich36@yahoo.com",
        "phone": "327-589-7514",
        "status": false,
        "id": "34"
    },
    {
        "name": "Raul Hessel MD",
        "dob": "1978-06-15T21:16:19.341Z",
        "address": "Cicero",
        "email": "Ewell.Luettgen41@yahoo.com",
        "phone": "513-465-5488",
        "status": false,
        "id": "35"
    },
    {
        "name": "Cesar Farrell",
        "dob": "1975-01-31T07:32:23.084Z",
        "address": "West Valley City",
        "email": "Kathryne.Runte76@gmail.com",
        "phone": "768-278-4086",
        "status": false,
        "id": "36"
    },
    {
        "name": "Ms. Mercedes Waters MD",
        "dob": "1958-08-26T20:04:56.891Z",
        "address": "Clovis",
        "email": "Ena_Dibbert38@yahoo.com",
        "phone": "481-524-6350",
        "status": false,
        "id": "37"
    },
    {
        "name": "Raymond Conroy",
        "dob": "1963-09-16T22:53:32.972Z",
        "address": "Bridgeport",
        "email": "Price.Turner@yahoo.com",
        "phone": "651-503-7315",
        "status": false,
        "id": "38"
    },
    {
        "name": "Mrs. Arnold Effertz",
        "dob": "1996-04-14T12:22:20.626Z",
        "address": "Elkhart",
        "email": "Mara_Blick67@yahoo.com",
        "phone": "386-834-8036",
        "status": false,
        "id": "39"
    },
    {
        "name": "Miss Catherine Miller",
        "dob": "1944-02-20T21:31:14.118Z",
        "address": "Rowland Heights",
        "email": "Karina_Pacocha59@gmail.com",
        "phone": "570-355-7675",
        "status": false,
        "id": "40"
    },
    {
        "name": "Mario Schmidt",
        "dob": "1958-06-06T19:08:18.746Z",
        "address": "Roanoke",
        "email": "Cristopher97@gmail.com",
        "phone": "487-697-6317",
        "status": false,
        "id": "41"
    },
    {
        "name": "Mrs. Jody Lebsack I",
        "dob": "2002-08-19T04:19:51.065Z",
        "address": "North Miami",
        "email": "Carey_Kling42@gmail.com",
        "phone": "231-298-9261",
        "status": false,
        "id": "42"
    },
    {
        "name": "Jimmie Rippin",
        "dob": "2000-01-03T23:54:40.940Z",
        "address": "Honolulu",
        "email": "Jerry.Mante7@yahoo.com",
        "phone": "529-364-8627",
        "status": false,
        "id": "43"
    },
    {
        "name": "Steve Smitham",
        "dob": "2001-12-03T15:58:06.006Z",
        "address": "Doral",
        "email": "Bailee.Beatty29@gmail.com",
        "phone": "386-478-6697",
        "status": false,
        "id": "44"
    },
    {
        "name": "Mr. Johnathan Littel",
        "dob": "1992-09-10T15:22:30.701Z",
        "address": "Towson",
        "email": "Sidney41@gmail.com",
        "phone": "919-388-5751",
        "status": false,
        "id": "45"
    },
    {
        "name": "Erma Adams Sr.",
        "dob": "1978-11-22T08:19:22.999Z",
        "address": "Downey",
        "email": "Ignatius.Batz70@yahoo.com",
        "phone": "945-804-7770",
        "status": false,
        "id": "46"
    },
    {
        "name": "Jody Emmerich",
        "dob": "1962-01-19T23:29:28.062Z",
        "address": "Yuba City",
        "email": "Stan4@gmail.com",
        "phone": "761-833-3446",
        "status": false,
        "id": "47"
    },
    {
        "name": "Bridget Heidenreich",
        "dob": "1978-04-29T16:49:35.008Z",
        "address": "Tamarac",
        "email": "Frederik.Becker84@hotmail.com",
        "phone": "213-547-0019",
        "status": false,
        "id": "48"
    },
    {
        "name": "Karl Doyle",
        "dob": "1967-04-10T19:58:09.299Z",
        "address": "Utica",
        "email": "Jalen_Witting@yahoo.com",
        "phone": "661-979-2720",
        "status": false,
        "id": "49"
    },
    {
        "name": "Israel Collins MD",
        "dob": "1986-07-12T23:47:21.391Z",
        "address": "New Orleans",
        "email": "Ruby.Bailey5@gmail.com",
        "phone": "831-907-1942",
        "status": false,
        "id": "50"
    },
    {
        "name": "Christine Jenkins",
        "dob": "1972-01-26T06:59:31.620Z",
        "address": "Coral Gables",
        "email": "Joana_Dare76@yahoo.com",
        "phone": "706-950-2155",
        "status": false,
        "id": "51"
    },
    {
        "name": "Devin Renner",
        "dob": "1961-02-15T20:06:45.155Z",
        "address": "Pittsfield",
        "email": "Ellsworth0@hotmail.com",
        "phone": "822-623-3118",
        "status": false,
        "id": "52"
    },
    {
        "name": "Mr. Mae Flatley",
        "dob": "1949-05-26T20:25:21.000Z",
        "address": "Cincinnati",
        "email": "Elton_Torphy@yahoo.com",
        "phone": "969-960-0604",
        "status": false,
        "id": "53"
    },
    {
        "name": "Julio Mitchell",
        "dob": "1962-10-26T02:30:55.354Z",
        "address": "Newark",
        "email": "Vella_Larkin55@yahoo.com",
        "phone": "750-227-0573",
        "status": false,
        "id": "54"
    },
    {
        "name": "Margaret Windler",
        "dob": "1960-01-19T08:31:03.793Z",
        "address": "Wilson",
        "email": "Heber.Kuphal72@yahoo.com",
        "phone": "655-450-1617",
        "status": false,
        "id": "55"
    },
    {
        "name": "Mrs. Tommie Bailey",
        "dob": "1951-04-03T04:41:53.903Z",
        "address": "Des Plaines",
        "email": "Francisco_Reynolds@yahoo.com",
        "phone": "509-788-3963",
        "status": false,
        "id": "56"
    },
    {
        "name": "Ed Cummings",
        "dob": "1971-12-03T05:07:42.753Z",
        "address": "Murrieta",
        "email": "Jaleel95@yahoo.com",
        "phone": "562-882-0623",
        "status": false,
        "id": "57"
    },
    {
        "name": "Kristy Price",
        "dob": "1973-02-13T04:21:33.041Z",
        "address": "San Francisco",
        "email": "Unique91@gmail.com",
        "phone": "946-997-6719",
        "status": false,
        "id": "58"
    },
    {
        "name": "Casey MacGyver",
        "dob": "1946-11-25T14:47:24.401Z",
        "address": "Cranston",
        "email": "Hugh29@gmail.com",
        "phone": "961-690-0621",
        "status": false,
        "id": "59"
    },
    {
        "name": "Susie Hayes",
        "dob": "1949-02-28T05:02:13.051Z",
        "address": "Grapevine",
        "email": "Moses.Koss48@gmail.com",
        "phone": "555-931-1396",
        "status": false,
        "id": "60"
    },
    {
        "name": "Charlotte Farrell",
        "dob": "1993-12-11T20:06:39.976Z",
        "address": "Youngstown",
        "email": "Dudley.Kihn4@yahoo.com",
        "phone": "806-298-7012",
        "status": false,
        "id": "61"
    },
    {
        "name": "Neil Harvey",
        "dob": "1974-07-13T22:49:54.589Z",
        "address": "Apopka",
        "email": "Wyman_Heller49@yahoo.com",
        "phone": "711-309-9261",
        "status": false,
        "id": "62"
    },
    {
        "name": "Nick Crona",
        "dob": "2005-05-04T11:33:29.592Z",
        "address": "Carson City",
        "email": "Dedric.Ryan35@gmail.com",
        "phone": "510-381-2401",
        "status": false,
        "id": "63"
    },
    {
        "name": "Fannie O'Connell",
        "dob": "1975-10-21T06:46:18.140Z",
        "address": "Yakima",
        "email": "Frederic.Torphy@hotmail.com",
        "phone": "777-720-6572",
        "status": false,
        "id": "64"
    },
    {
        "name": "Miss Isaac Kirlin",
        "dob": "1988-10-25T08:14:49.753Z",
        "address": "Plymouth",
        "email": "Aniya.Jacobi@hotmail.com",
        "phone": "823-668-0607",
        "status": false,
        "id": "65"
    },
    {
        "name": "Patsy Bailey",
        "dob": "2003-09-12T00:07:00.041Z",
        "address": "Sammamish",
        "email": "Nikita30@gmail.com",
        "phone": "698-988-3299",
        "status": false,
        "id": "66"
    },
    {
        "name": "Ray Spencer MD",
        "dob": "1952-10-17T03:57:27.703Z",
        "address": "Arlington Heights",
        "email": "Uriel.Schamberger41@hotmail.com",
        "phone": "953-567-4550",
        "status": false,
        "id": "67"
    },
    {
        "name": "John Kovacek",
        "dob": "1953-03-14T11:24:21.865Z",
        "address": "Las Cruces",
        "email": "Alvis79@gmail.com",
        "phone": "844-973-7564",
        "status": false,
        "id": "68"
    },
    {
        "name": "Cecil Greenfelder",
        "dob": "1958-03-17T05:51:22.580Z",
        "address": "Oakland",
        "email": "Adalberto.Klocko@yahoo.com",
        "phone": "573-505-0649",
        "status": false,
        "id": "69"
    },
    {
        "name": "Erika Kirlin",
        "dob": "2006-07-05T09:36:41.437Z",
        "address": "Murray",
        "email": "Ernest86@gmail.com",
        "phone": "237-801-7279",
        "status": false,
        "id": "70"
    },
    {
        "name": "Dean Gislason",
        "dob": "2006-08-21T01:29:39.627Z",
        "address": "York",
        "email": "Freida.Powlowski71@gmail.com",
        "phone": "679-990-4620",
        "status": false,
        "id": "71"
    },
    {
        "name": "Miss Molly Collins",
        "dob": "1958-01-25T07:16:21.582Z",
        "address": "Binghamton",
        "email": "Vicenta_Wyman1@hotmail.com",
        "phone": "646-647-2194",
        "status": false,
        "id": "72"
    },
    {
        "name": "Spencer Gorczany",
        "dob": "1976-12-21T18:38:40.870Z",
        "address": "Nashua",
        "email": "Meda_Franey54@yahoo.com",
        "phone": "425-474-7535",
        "status": false,
        "id": "73"
    },
    {
        "name": "Judith Olson",
        "dob": "1987-06-17T12:01:28.659Z",
        "address": "Berwyn",
        "email": "Kathleen.Gleason@yahoo.com",
        "phone": "691-473-2102",
        "status": false,
        "id": "74"
    },
    {
        "name": "Celia Kuphal",
        "dob": "1973-01-17T21:56:34.565Z",
        "address": "Rancho Palos Verdes",
        "email": "Demetrius_Mraz@yahoo.com",
        "phone": "775-895-0552",
        "status": false,
        "id": "75"
    },
    {
        "name": "Elbert Block",
        "dob": "1979-01-06T18:04:08.250Z",
        "address": "Kenosha",
        "email": "Etha_Hermann@gmail.com",
        "phone": "792-510-0815",
        "status": false,
        "id": "76"
    },
    {
        "name": "Priscilla VonRueden DVM",
        "dob": "1963-03-12T07:35:13.682Z",
        "address": "North Highlands",
        "email": "Alec.Feeney@hotmail.com",
        "phone": "732-888-0025",
        "status": false,
        "id": "77"
    },
    {
        "name": "Colin Zieme",
        "dob": "1994-09-13T07:47:07.794Z",
        "address": "Camarillo",
        "email": "Jay.Stracke79@yahoo.com",
        "phone": "408-401-2760",
        "status": false,
        "id": "78"
    },
    {
        "name": "Joyce Wiegand",
        "dob": "1975-12-04T08:29:49.818Z",
        "address": "Fayetteville",
        "email": "Brando_Jacobs@gmail.com",
        "phone": "366-303-8779",
        "status": false,
        "id": "79"
    },
    {
        "name": "Mrs. Darnell Casper",
        "dob": "1997-12-27T01:30:35.824Z",
        "address": "Methuen Town",
        "email": "Alba_Gutmann@hotmail.com",
        "phone": "916-372-6251",
        "status": false,
        "id": "80"
    },
    {
        "name": "Dr. Richard Tremblay",
        "dob": "1956-01-20T10:07:12.255Z",
        "address": "Camden",
        "email": "Jean.Kihn25@gmail.com",
        "phone": "702-407-5797",
        "status": false,
        "id": "81"
    },
    {
        "name": "Jody Collier",
        "dob": "1948-06-12T23:52:30.178Z",
        "address": "Carmichael",
        "email": "Laurence_Kris@yahoo.com",
        "phone": "697-752-6268",
        "status": false,
        "id": "82"
    },
    {
        "name": "Miss Ralph Macejkovic",
        "dob": "1944-12-30T11:14:18.070Z",
        "address": "Cambridge",
        "email": "Laurie_Spencer54@gmail.com",
        "phone": "662-793-5166",
        "status": false,
        "id": "83"
    },
    {
        "name": "Sam Marks",
        "dob": "1957-05-23T22:34:35.690Z",
        "address": "Pinellas Park",
        "email": "Era.Turner37@gmail.com",
        "phone": "356-867-0300",
        "status": false,
        "id": "84"
    },
    {
        "name": "Elizabeth McClure",
        "dob": "1966-06-22T09:32:24.218Z",
        "address": "Fontana",
        "email": "Javier.Erdman23@hotmail.com",
        "phone": "565-873-0038",
        "status": false,
        "id": "85"
    },
    {
        "name": "Rolando Ferry",
        "dob": "1954-10-21T02:07:18.003Z",
        "address": "Florissant",
        "email": "Wilton_McLaughlin@hotmail.com",
        "phone": "457-695-5817",
        "status": false,
        "id": "86"
    },
    {
        "name": "Joseph Nolan",
        "dob": "1951-02-17T23:56:52.016Z",
        "address": "Trenton",
        "email": "Katheryn_Rempel@yahoo.com",
        "phone": "453-602-3962",
        "status": false,
        "id": "87"
    },
    {
        "name": "Edwin Hoeger",
        "dob": "1973-05-03T02:45:10.048Z",
        "address": "Mansfield",
        "email": "Krista72@yahoo.com",
        "phone": "579-834-1274",
        "status": false,
        "id": "88"
    },
    {
        "name": "Gina Rempel MD",
        "dob": "2001-09-09T13:33:59.749Z",
        "address": "New Bedford",
        "email": "Arlene43@yahoo.com",
        "phone": "499-284-0012",
        "status": false,
        "id": "89"
    },
    {
        "name": "Deanna Gleichner",
        "dob": "1984-03-23T01:02:31.230Z",
        "address": "Spring Valley",
        "email": "Darrel_Conroy6@yahoo.com",
        "phone": "277-343-7490",
        "status": false,
        "id": "90"
    },
    {
        "name": "Sylvia Jerde",
        "dob": "1954-03-26T16:05:15.501Z",
        "address": "Norwalk",
        "email": "Urban93@hotmail.com",
        "phone": "844-713-8219",
        "status": false,
        "id": "91"
    },
    {
        "name": "Kenneth Funk",
        "dob": "1994-12-11T05:39:04.470Z",
        "address": "Anaheim",
        "email": "Will_Stanton@hotmail.com",
        "phone": "845-466-8472",
        "status": false,
        "id": "92"
    },
    {
        "name": "Rene Carter",
        "dob": "1950-03-21T05:13:53.961Z",
        "address": "West Palm Beach",
        "email": "Fernando_Klocko3@yahoo.com",
        "phone": "414-997-7807",
        "status": false,
        "id": "93"
    },
    {
        "name": "Doreen Corwin",
        "dob": "1998-08-02T20:11:41.209Z",
        "address": "Lewisville",
        "email": "Lonny42@hotmail.com",
        "phone": "880-879-0018",
        "status": false,
        "id": "94"
    },
    {
        "name": "Pat Howe",
        "dob": "1952-03-25T07:55:31.212Z",
        "address": "Overland Park",
        "email": "Dion94@yahoo.com",
        "phone": "444-552-1221",
        "status": false,
        "id": "95"
    },
    {
        "name": "Levi Reichel",
        "dob": "1966-07-23T17:48:44.793Z",
        "address": "Diamond Bar",
        "email": "Mustafa_Hyatt@gmail.com",
        "phone": "622-899-8356",
        "status": false,
        "id": "96"
    },
    {
        "name": "Rosalie Torphy",
        "dob": "1946-01-23T17:21:55.279Z",
        "address": "Hartford",
        "email": "Adelbert49@yahoo.com",
        "phone": "577-719-8749",
        "status": false,
        "id": "97"
    },
    {
        "name": "Marianne Kreiger",
        "dob": "2000-01-31T07:19:46.446Z",
        "address": "Bolingbrook",
        "email": "Dennis_Herzog68@gmail.com",
        "phone": "758-483-3306",
        "status": false,
        "id": "98"
    },
    {
        "name": "Wilbert Kozey",
        "dob": "1961-11-23T06:27:43.897Z",
        "address": "Yorba Linda",
        "email": "Esta_Runolfsdottir@yahoo.com",
        "phone": "986-729-9493",
        "status": false,
        "id": "99"
    },
    {
        "name": "Taylor Marquardt",
        "dob": "1954-07-02T10:35:26.540Z",
        "address": "Denver",
        "email": "Regan.Kunde50@yahoo.com",
        "phone": "827-912-2885",
        "status": false,
        "id": "100"
    }
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const ViewPartner = () => {
    return (
        <div className='view-partner-wrapper'>
            <h2 className='title'>List of partners:</h2>
            <div className='search'>
                <SearchOutlined className='icon' />
                <input className='input' type="text" />
            </div>
            <Table
                bordered={true}
                columns={columns}
                dataSource={data}
                onChange={onChange}
                scroll={{
                    y: 440,
                }}
            />
        </div>
    )
}

export default ViewPartner;