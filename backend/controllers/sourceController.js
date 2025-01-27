const db = require('../database/db');
const Source = require('../models/Source');
const SourceService = require('../services/sourceService');

const sourceModel = new Source(db);
const sourceService = new SourceService(sourceModel);

exports.getCapitalSources = async (req, res) => {
  try {
    const [results] = await sourceService.getAllActiveSources();
    res.json(results);
  } catch (err) {
    console.error('Error fetching capital sources:', err);
    res.status(500).send('Error fetching capital sources');
  }
};

exports.getBankAccounts = async (req, res) => {
  try {
    const [results] = await sourceService.getBankAccounts();
    res.json(results);
  } catch (err) {
    console.error('Error fetching bank accounts:', err);
    res.status(500).send('Error fetching bank accounts');
  }
};

exports.getDigitalWallets = async (req, res) => {
  try {
    const [results] = await sourceService.getDigitalWallets();
    res.json(results);
  } catch (err) {
    console.error('Error fetching digital wallets:', err);
    res.status(500).send('Error fetching digital wallets');
  }
};

exports.getCards = async (req, res) => {
  try {
    const [results] = await sourceService.getCards();
    res.json(results);
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).send('Error fetching cards');
  }
};

exports.getCreditCards = async (req, res) => {
  try {
    const [results] = await sourceService.getCreditCards();
    res.json(results);
  } catch (err) {
    console.error('Error fetching cards:', err);
    res.status(500).send('Error fetching credit cards');
  }
};

exports.getGifts = async (req, res) => {
  try {
    const [results] = await sourceService.getGifts();
    res.json(results);
  } catch (err) {
    console.error('Error fetching gifts:', err);
    res.status(500).send('Error fetching gifts');
  }
};

exports.addCapitalSource = async (req, res) => {
  try {
    await sourceService.addSource(req.body);
    res.status(201).send('Capital source added successfully');
  } catch (err) {
    console.error('Error adding capital source:', err);
    res.status(500).send('Error adding capital source');
  }
};

exports.deleteCapitalSource = async (req, res) => {
  try {
    await sourceService.markSourceInactive(req.params.sourceId);
    res.send('Capital source marked as inactive successfully');
  } catch (err) {
    console.error('Error updating capital source:', err);
    res.status(500).send('Error updating capital source');
  }
};

exports.getSourceById = async (req, res) => {
  try {
    const sourceId = req.params.sourceId;
    const [results] = await sourceService.getSourceById(sourceId);
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching source details:', err);
    res.status(500).send('Error fetching source details');
  }
};
