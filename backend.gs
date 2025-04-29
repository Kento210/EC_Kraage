function doGet(e) {
  const htmlOutput = HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Harvest Market')
    .setFaviconUrl('https://example.com/favicon.ico');
  return htmlOutput;
}

function doPost(e) {
  const action = e.parameter.action;
  const data = JSON.parse(e.postData.contents);

  switch (action) {
    case 'addProduct':
      return addProduct(data);
    case 'getProducts':
      return getProducts();
    case 'deleteProduct':
      return deleteProduct(data.id);
    default:
      return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' })).setMimeType(ContentService.MimeType.JSON);
  }
}

function addProduct(product) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Products');
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'Sheet not found' })).setMimeType(ContentService.MimeType.JSON);
  }

  sheet.appendRow([product.id, product.name, product.image, product.price, product.description, product.quantity, product.growingMethod, product.date]);
  return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
}

function getProducts() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Products');
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'Sheet not found' })).setMimeType(ContentService.MimeType.JSON);
  }

  const data = sheet.getDataRange().getValues();
  const products = data.slice(1).map(row => ({
    id: row[0],
    name: row[1],
    image: row[2],
    price: row[3],
    description: row[4],
    quantity: row[5],
    growingMethod: row[6],
    date: row[7]
  }));

  return ContentService.createTextOutput(JSON.stringify(products)).setMimeType(ContentService.MimeType.JSON);
}

function deleteProduct(id) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Products');
  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ error: 'Sheet not found' })).setMimeType(ContentService.MimeType.JSON);
  }

  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      sheet.deleteRow(i + 1);
      return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ error: 'Product not found' })).setMimeType(ContentService.MimeType.JSON);
}