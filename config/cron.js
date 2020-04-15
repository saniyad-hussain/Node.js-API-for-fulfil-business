/**
 * Sails hook for running cron tasks
 * (sails.config.cron)
 */

if (process.env.NODE_ENV !== 'test') {
  module.exports.cron = {
    firstJob: {
      schedule: '0 15 */1 * *',
      onTick: () => {
        console.log('I am triggering every day at 3 PM');
      }
    }
  };
}
