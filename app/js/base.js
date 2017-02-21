let base = {
    parseDate: function(d) {
        if (typeof(d) === 'object') {
            return d;
        } else if (typeof(d) === 'string' && d.indexOf('-')) {
            if (d.indexOf(' ')) {
                d = d.split(' ')[0];
            }
            var da = d.split('-');
            return new Date(da[0], da[1] - 1, da[2]);
        } else {
            return new Date(d);
        }
    },
    formatDate: function(d, format) {
        let formatedDate
        d = base.parseDate(d);
        var mon = d.getMonth() + 1;
        if (mon < 10) {
            mon = '0' + mon;
        }
        var day = d.getDate()
        if (day < 10) {
            day = '0' + day;
        }
        var hour = d.getHours();
        if (hour < 10) {
            hour = '0' + hour;
        }
        var minute = d.getMinutes();
        if (minute < 10) {
            minute = '0' + minute;
        }
        var second = d.getSeconds();
        if (second < 10) {
            second = '0' + second;
        }
        switch (format) {
            case 'mm-dd hh:mm':
                formatedDate = mon + '-' + day + ' ' + hour + ":" + minute;
                break;
            case 'mm-dd':
                formatedDate = mon + '-' + day;
                break;
            case 'yyyy-mm':
                formatedDate = d.getFullYear() + '-' + mon;
                break;
            case 'yyyymmdd:hhmm':
                formatedDate = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日 " + hour + ":" + minute;
                break;
            case 'yyyy-mm-dd hh:mm':
                formatedDate = d.getFullYear() + '-' + mon + '-' + day + " " + hour + ":" + minute;
                break;
            case 'yyyymmdd:hhmmss':
                formatedDate = d.getFullYear() + '-' + mon + '-' + day + " " + hour + ":" + minute + ":" + second;
                break;
            case 'mm-dd hhmmss':
                formatedDate = mon + '-' + day + " " + hour + ":" + minute + ":" + second;
                break;
            case 'hhmmss':
                formatedDate = hour + ":" + minute + ":" + second;
                break;
            case 'hhmm':
                formatedDate = hour + ":" + minute;
                break;
            case 'yyyy/mm/dd':
                formatedDate = d.getFullYear() + '/' + mon + '/' + day;
                break;
            case 'yyyy.mm.dd hh:mm':
                formatedDate = d.getFullYear() + '.' + mon + '.' + day +  " " + hour + ":" + minute;
                break;
            case 'yyyy.mm.dd':
                formatedDate = d.getFullYear() + '.' + mon + '.' + day;
                break;
            default:
                formatedDate = d.getFullYear() + '-' + mon + '-' + day;
                break;
        }
        return formatedDate;
    }
}
export default base