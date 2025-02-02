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
    const [results] = await sourceService.getByIdSource(sourceId);
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching source details:', err);
    res.status(500).send('Error fetching source details');
  }
};
