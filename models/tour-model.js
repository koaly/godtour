const mongoose = require('mongoose');

const tourSchema = mongoose.Schema({
    title:{ //ชื่อทัวร์
        type: String,
        required: true
    },
    organizer:{ //ชื่อผู้ให้บริการทัวร์
        type: String,
        required: true
    },
    organizerId:{ //ไอดีผู้ให้บริการทัวร์ (แมตช์กับ user._id)
        type: String,
        required: true
    },
    price:{ //ราคาทัวร์ (บาท)
        type: Number,
        required: true
    },
    destination:{ //จุดมุ่งหมาย ที่ที่จะไป
        type: String,
        required: true
    },
    day_duration:{ //จำนวนวัน
        type: Number,
        required: true
    },
    night_duration:{ //จำนวนคืน -> พอเอามารวมกันจะได้เป็น x วัน y คืน
        type: Number,
        required: true
    },
    start_book:{ //วัน + เวลาที่เริ่มเปิดทำการจอง
        type: Date,
        required: true
    },
    end_book:{ //วัน + เวลาที่ปิดทำการจอง
        type: Date,
        required: true
    },
    start_trip:{ //วันที่เริ่มทริป + เวลาที่เครื่องบินออก(ไป)
        type: Date,
        required: true
    },
    end_trip:{ //วันสุดท้ายของทริป + เวลาที่เครื่องบินออก(กลับ)
        type: Date,
        required: true
    },
    flight_airline:{ //สายการบินที่ใช้บริการ
        type: String,
        required: true
    },
    flight_airport:{ //สนามบินของเที่ยวไป
        type: String,
        required: true
    },
    flight_depart:{ //ชื่อเที่ยวบินไป
        type: String,
        required: true
    },
    flight_return:{ //ชื่อเที่ยวบินกลับ
        type: String,
        required: true
    },
    food:{ //มื้ออาหารที่รวมในค่าใช้จ่ายที่แจ้งไว้ในตอนแรก
        type: Number,
        default: 0,
        required: true
    },
    stars:{ //เกรดของทัวร์ที่ประเมินโดนผู้ให้บริการทัวร์
        type: Number,
        required: true
    },
    max_seat:{ //จำนวนที่นั่งสูงสุดของทัวร์
        type: Number,
        required: true
    },
    now_seat:{ //จำนวนที่นั่งคงเหลือของทัวร์
        type: Number,
        required: true
    },
    description:{ //รายละเอียดทั้งหมดของทัวร์
        type: String
    },
    highlight:{ //รายละเอียดเด่นๆ ของทัวร์ (ควรโชว์อันนี้ไว้บนสุด)
        type: String
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;