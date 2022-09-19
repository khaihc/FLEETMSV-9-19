import express, { Request, Response } from "express";
import * as countryService from "../services/country-service";

const router = express.Router();

var cors = require('cors')
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(cors());

router.get('/countries', (req: Request, res: Response) => {
  countryService.getCountries()
    .then((countries) => {res.status(200).send(countries)})
    .catch((error) => {res.send(error.message)});
});

router.get('/countries/:id', (req: Request, res: Response) => { 
    countryService.getContryById(parseInt(req.params.id))
    .then((country) =>{res.status(200).send(country)})
    .catch(error => {res.send(error)})
})

router.post('/countries', (req: Request, res: Response) => { 
    countryService.saveCountry(req.body)
    .then((country) =>{res.status(200).send("SAVE Successfully")})
    .catch(error => {res.status(303).send(error)})
})

router.put('/countries/:id', (req: Request, res: Response) => { 
    countryService.updateCountry(parseInt(req.params.id), req.body)
    .then((country) =>{res.status(200).send("UPDATE Successfully")})
    .catch(error => {res.status(303).send(error)})
})

router.delete('/countries/:id', (req: Request, res: Response) => { 
    countryService.deleteCountry(parseInt(req.params.id))
    .then((country) =>{res.send("DELETE Successfully")})
    .catch(error => {res.send( error)})
})


export default router
