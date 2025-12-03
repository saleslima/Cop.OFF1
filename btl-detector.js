// BTL Detection based on GeoJSON polygon maps

let btlPolygons = null;

async function loadBTLPolygons() {
    if (btlPolygons) return btlPolygons;

    try {
        const responses = await Promise.all([
            fetch('/1.BPM_M (2).geojson').then(r => r.json()),
            fetch('/2.BPM_M (2).geojson').then(r => r.json()),
            fetch('/3.BPM_M (4).geojson').then(r => r.json()),
            fetch('/4.BPM_M.geojson').then(r => r.json()),
            fetch('/5.BPM_M.geojson').then(r => r.json()),
            fetch('/6.BPM_M.geojson').then(r => r.json()),
            fetch('/7.BPM_M (7).geojson').then(r => r.json()),
            fetch('/8.BPM_M.geojson').then(r => r.json()),
            fetch('/9.BPM_M.geojson').then(r => r.json()),
            fetch('/10.BPM_M.geojson').then(r => r.json()),
            fetch('/11.BPM_M (5).geojson').then(r => r.json()),
            fetch('/12.BPM_M.geojson').then(r => r.json()),
            fetch('/13.BPM_M (5).geojson').then(r => r.json()),
            fetch('/14.BPM_M.geojson').then(r => r.json()),
            fetch('/15.BPM_M.geojson').then(r => r.json()),
            fetch('/16.BPM_M.geojson').then(r => r.json()),
            fetch('/17.BPM_M.geojson').then(r => r.json()),
            fetch('/18.BPM_M.geojson').then(r => r.json()),
            fetch('/19.BPM_M.geojson').then(r => r.json()),
            fetch('/20.BPM_M.geojson').then(r => r.json()),
            fetch('/21.BPM_M.geojson').then(r => r.json()),
            fetch('/22.BPM_M (2).geojson').then(r => r.json()),
            fetch('/23.BPM_M.geojson').then(r => r.json()),
            fetch('/24.BPM_M.geojson').then(r => r.json()),
            fetch('/25.BPM_M.geojson').then(r => r.json()),
            fetch('/26.BPM_M.geojson').then(r => r.json()),
            fetch('/27.BPM_M.geojson').then(r => r.json()),
            fetch('/28.BPM_M (2).geojson').then(r => r.json()),
            fetch('/29.BPM_M.geojson').then(r => r.json()),
            fetch('/30.BPM_M.geojson').then(r => r.json()),
            fetch('/31.BPM_M.geojson').then(r => r.json()),
            fetch('/32.BPM_M.geojson').then(r => r.json()),
            fetch('/33.BPM_M.geojson').then(r => r.json()),
            fetch('/35.BPM_M.geojson').then(r => r.json()),
            fetch('/36.BPM_M.geojson').then(r => r.json()),
            fetch('/37.BPM_M.geojson').then(r => r.json()),
            fetch('/38.BPM_M.geojson').then(r => r.json()),
            fetch('/39.BPM_M.geojson').then(r => r.json()),
            fetch('/43.BPM_M.geojson').then(r => r.json()),
            fetch('/46.BPM_M.geojson').then(r => r.json()),
            fetch('/48.BPM_M.geojson').then(r => r.json()),
            fetch('/49.BPM_M.geojson').then(r => r.json())
        ]);

        btlPolygons = {
            '01º BPM/M': responses[0],
            '02º BPM/M': responses[1],
            '03º BPM/M': responses[2],
            '04º BPM/M': responses[3],
            '05º BPM/M': responses[4],
            '06º BPM/M': responses[5],
            '07º BPM/M': responses[6],
            '08º BPM/M': responses[7],
            '09º BPM/M': responses[8],
            '10º BPM/M': responses[9],
            '11º BPM/M': responses[10],
            '12º BPM/M': responses[11],
            '13º BPM/M': responses[12],
            '14º BPM/M': responses[13],
            '15º BPM/M': responses[14],
            '16º BPM/M': responses[15],
            '17º BPM/M': responses[16],
            '18º BPM/M': responses[17],
            '19º BPM/M': responses[18],
            '20º BPM/M': responses[19],
            '21º BPM/M': responses[20],
            '22º BPM/M': responses[21],
            '23º BPM/M': responses[22],
            '24º BPM/M': responses[23],
            '25º BPM/M': responses[24],
            '26º BPM/M': responses[25],
            '27º BPM/M': responses[26],
            '28º BPM/M': responses[27],
            '29º BPM/M': responses[28],
            '30º BPM/M': responses[29],
            '31º BPM/M': responses[30],
            '32º BPM/M': responses[31],
            '33º BPM/M': responses[32],
            '35º BPM/M': responses[33],
            '36º BPM/M': responses[34],
            '37º BPM/M': responses[35],
            '38º BPM/M': responses[36],
            '39º BPM/M': responses[37],
            '43º BPM/M': responses[38],
            '46º BPM/M': responses[39],
            '48º BPM/M': responses[40],
            '49º BPM/M': responses[41]
        };

        return btlPolygons;
    } catch (error) {
        console.error('Error loading BTL polygons:', error);
        return null;
    }
}

function pointInPolygon(point, polygon) {
    const [x, y] = point;
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];

        const intersect = ((yi > y) !== (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

function checkPointInGeoJSON(lat, lon, geojson) {
    if (!geojson || !geojson.features) return false;

    for (const feature of geojson.features) {
        if (feature.geometry.type === 'Polygon') {
            for (const ring of feature.geometry.coordinates) {
                if (pointInPolygon([lon, lat], ring)) {
                    return true;
                }
            }
        } else if (feature.geometry.type === 'MultiPolygon') {
            for (const polygon of feature.geometry.coordinates) {
                for (const ring of polygon) {
                    if (pointInPolygon([lon, lat], ring)) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

export async function detectBTLFromAddress(rua, numero, municipio, estado) {
    const btlSelect = document.getElementById('btl');
    const btlStatus = document.getElementById('btlStatus');

    if (!btlStatus) return;

    btlStatus.textContent = 'Detectando BTL...';
    btlStatus.style.color = '#666';

    try {
        // Geocode the address
        const address = `${rua}, ${numero}, ${municipio}, ${estado}, Brasil`;
        const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

        const response = await fetch(geocodeUrl, {
            headers: {
                'User-Agent': 'COPOM-APP'
            }
        });

        const results = await response.json();

        if (results.length === 0) {
            btlStatus.textContent = 'Endereço não encontrado';
            btlStatus.style.color = '#ff9800';
            return;
        }

        const lat = parseFloat(results[0].lat);
        const lon = parseFloat(results[0].lon);

        // Load BTL polygons
        const polygons = await loadBTLPolygons();

        if (!polygons) {
            btlStatus.textContent = 'Erro ao carregar mapas';
            btlStatus.style.color = '#d32f2f';
            return;
        }

        // Check which BTL the point falls into
        let detectedBTL = null;

        for (const [btl, geojson] of Object.entries(polygons)) {
            if (checkPointInGeoJSON(lat, lon, geojson)) {
                detectedBTL = btl;
                break;
            }
        }

        if (detectedBTL) {
            btlSelect.value = detectedBTL;
            btlStatus.textContent = ` BTL detectado: ${detectedBTL}`;
            btlStatus.style.color = '#388e3c';
        } else {
            btlStatus.textContent = 'BTL não identificado automaticamente';
            btlStatus.style.color = '#ff9800';
        }

    } catch (error) {
        console.error('Error detecting BTL:', error);
        btlStatus.textContent = 'Erro na detecção';
        btlStatus.style.color = '#d32f2f';
    }
}