module.exports = function (sequelize, DataTypes) {
    var attendance = sequelize.define('attendance',{
        user_id: {
            type: DataTypes.STRING(20),
            primaryKey: true
        },
        attendance_date: {
            type: DataTypes.DATEONLY,
            primaryKey: true
        }
    }, {
        timestamps: false,
        tableName: 'attendance'
    });
    return attendance;
};