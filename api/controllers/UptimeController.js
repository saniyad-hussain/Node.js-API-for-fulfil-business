/**
 * UptimeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
   * Get Latency Data
   * @param {Request} req
   * @param {Response} res
   */
  getLatencyData: async (req, res) => {
    const machines = [];
    let types = [];
    let machineTypes = [];
    const uniqueMachines = [];
    const response = [];
    const db = await sails.getDatastore('mongodbUptimeData').manager;
    const collections = db.collection('UpTime');
    collections.find({
      'createdAt': {
        $gte: Date.now() - 100000 * 60 * 60 * 24
      }
    }).toArray((err, results) => {
      if (results) {
        for (const item of results) {
          if (machines[item.Machine]) {
            continue;
          } else {
            machines[item.Machine] = true;
            uniqueMachines.push(item.Machine);
          }
        }
        for (const machine of uniqueMachines) {
          machineTypes = [];
          types = [];
          for (const item of results) {
            if (item.Machine === machine) {
              if (types[item.Type]) {
                continue;
              } else {
                types[item.Type] = true;
                machineTypes.push(item.Type);
              }
            }
          }
          for (const machineType of machineTypes) {
            let entryCount = 0;
            let lt125Ms = 0;
            let lt250Ms = 0;
            let lt500Ms = 0;
            let lt1000Ms = 0;
            let lt2000Ms = 0;
            let lt4000Ms = 0;
            let lt8000Ms = 0;
            let gt8000Ms = 0;
            let totalUpTime = 0;
            for (const item of results) {
              if (item.Machine === machine && item.Type === machineType) {
                ++entryCount;
                totalUpTime = totalUpTime + item.UpTime;
                if (item.UpTime <= 125) {
                  ++lt125Ms;
                } else if (item.UpTime >= 126 && item.UpTime <= 250) {
                  ++lt250Ms;
                } else if (item.UpTime >= 251 && item.UpTime <= 500) {
                  ++lt500Ms;
                } else if (item.UpTime >= 501 && item.UpTime <= 1000) {
                  ++lt1000Ms;
                } else if (item.UpTime >= 1001 && item.UpTime <= 2000) {
                  ++lt2000Ms;
                } else if (item.UpTime >= 2001 && item.UpTime <= 4000) {
                  ++lt4000Ms;
                } else if (item.UpTime >= 4001 && item.UpTime <= 8000) {
                  ++lt8000Ms;
                } else if (item.UpTime > 8000) {
                  ++gt8000Ms;
                }
              }
            }
            response.push({
              machine: machine,
              type: machineType,
              uptimedata: {
                lessThan125ms: lt125Ms,
                lessThan250ms: lt250Ms,
                lessThan500ms: lt500Ms,
                lessThan1000ms: lt1000Ms,
                lessThan2000ms: lt2000Ms,
                lessThan4000ms: lt4000Ms,
                lessThan8000ms: lt8000Ms,
                greaterThan8000ms: gt8000Ms,
                totalRequests: entryCount,
                averageUpTime: Math.round(totalUpTime / entryCount)
              }
            });
          }
        }
        return res.json(response);
      } else {
        return res.json(err);
      }
    });
  }
};
