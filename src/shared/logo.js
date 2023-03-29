import {motion} from "framer-motion"

export default function Logo(props){
    return (
        <>
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="400.000000pt" height="150.000000pt" viewBox="0 400 1000.000000 100.000000"
        preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0.000000,1000.000000) scale(0.100000,-0.100000)"
        fill="rgba(255,255,255,0)" stroke="#ffffff" stroke-width="100">
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeatType: "loop",
            repeatDelay: 1
          }}
        d="M2580 7219 c-320 -38 -557 -106 -812 -235 -222 -113 -396 -240 -578
        -424 -545 -548 -762 -1343 -574 -2101 131 -532 465 -1004 930 -1314 238 -159
        552 -286 832 -335 91 -16 300 -40 350 -40 l42 0 0 413 0 414 -102 6 c-352 20
        -712 200 -950 473 -338 390 -436 920 -262 1406 184 511 679 885 1212 915 l102
        6 0 414 0 413 -57 -1 c-32 -1 -92 -6 -133 -10z"/>
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeatType: "loop",
            repeatDelay: 1
          }}
        d="M7230 6817 l0 -414 103 -6 c548 -31 1045 -418 1222 -950 57 -173 70
        -251 70 -447 0 -196 -13 -274 -70 -447 -177 -532 -674 -919 -1222 -950 l-103
        -6 0 -414 0 -413 43 0 c114 0 361 38 523 80 621 160 1160 608 1440 1195 286
        602 286 1308 0 1910 -171 360 -445 675 -782 900 -238 159 -552 286 -832 335
        -91 16 -300 40 -349 40 l-43 0 0 -413z"/>
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
          d="M5700 7509 c-177 -19 -406 -87 -570 -169 -717 -360 -1087 -1176 -885
          -1953 56 -217 165 -435 276 -552 113 -120 161 -184 211 -282 84 -162 119 -310
          120 -499 0 -216 -42 -385 -148 -589 -65 -127 -129 -212 -253 -335 -171 -170
          -337 -274 -553 -344 -160 -53 -286 -70 -453 -63 -236 10 -414 66 -583 184 -83
          57 -76 40 16 -36 328 -274 731 -414 1147 -398 169 7 248 18 385 54 515 134
          942 514 1146 1021 128 317 150 719 59 1061 -60 224 -160 423 -275 546 -141
          149 -207 255 -260 412 -33 101 -60 255 -60 348 1 282 118 595 309 825 72 87
          81 97 166 169 282 242 584 350 940 338 239 -9 426 -68 590 -189 124 -91 109
          -65 -30 51 -373 310 -826 451 -1295 400z"/>
      </g>
        </svg>
        {
            props.title != undefined ?
            <div style={{
                fontFamily: "Times New Roman",
                letterSpacing: "15px",
                textAlign: "center"
            }}>
                Classicum
            </div>
            :
            null
        }
        </>
    )
}