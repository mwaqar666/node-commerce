const {Op} = require('sequelize');
const modelPath = pathGenerator.modelPath;
const {redirectRoute} = require(pathGenerator.controllerPath('Controller'));
const Product = require(modelPath('Product'));
const {createSlug} = require(pathGenerator.utilsPath('utils'));