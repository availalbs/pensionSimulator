var pensionCalculator = (function(){
	var base_benefit_factor =0.02; //%
	var base_salary=1; //currency units
	var base_age=30;
	var retirement_age = 65; //years old
	var life_time_work = 35; //years
	var amoritization_period=30; //years
	var interest_rate=0.08; //%
	var inflation_rate=0.04; //%
	var salary_growth_rate=0.06; //%
	var employees=[];
	var mortality={"30":{"rp2000":0.000354,"rp2010_projection":0.000331,"improvement_rate":0.0663841808,"survive_to_nextyear_2000":0.999646,"survive_to65_2000":0.913324385823832,"survive_to_nextyear_2010":0.9996695,"survive_to65_2010":0.922792127695418},"31":{"rp2000":0.000403,"rp2010_projection":0.000379,"improvement_rate":0.0595533499,"survive_to_nextyear_2000":0.999597,"survive_to65_2000":0.913647817151104,"survive_to_nextyear_2010":0.999621,"survive_to65_2010":0.92309721132376},"32":{"rp2000":0.000456,"rp2010_projection":0.000429,"improvement_rate":0.0592105263,"survive_to_nextyear_2000":0.999544,"survive_to65_2000":0.914016165665867,"survive_to_nextyear_2010":0.999571,"survive_to65_2010":0.923447197811731},"33":{"rp2000":0.000513,"rp2010_projection":0.00048,"improvement_rate":0.0634146341,"survive_to_nextyear_2000":0.9994875,"survive_to65_2000":0.914433147180982,"survive_to_nextyear_2010":0.99952,"survive_to65_2010":0.923843526684679},"34":{"rp2000":0.000569,"rp2010_projection":0.000531,"improvement_rate":0.0668425682,"survive_to_nextyear_2000":0.9994315,"survive_to65_2000":0.914902034473649,"survive_to_nextyear_2010":0.9994695,"survive_to65_2010":0.924287184533255},"35":{"rp2000":0.000624,"rp2010_projection":0.00058,"improvement_rate":0.0705128205,"survive_to_nextyear_2000":0.999376,"survive_to65_2000":0.91542245213769,"survive_to_nextyear_2010":0.99942,"survive_to65_2010":0.924777779145091},"36":{"rp2000":0.000678,"rp2010_projection":0.000628,"improvement_rate":0.0730627306,"survive_to_nextyear_2000":0.9993225,"survive_to65_2000":0.915994032413916,"survive_to_nextyear_2010":0.999372,"survive_to65_2010":0.92531446153278},"37":{"rp2000":0.000729,"rp2010_projection":0.000673,"improvement_rate":0.0768175583,"survive_to_nextyear_2000":0.999271,"survive_to65_2000":0.916615039102908,"survive_to_nextyear_2010":0.999327,"survive_to65_2010":0.925895924173161},"38":{"rp2000":0.000781,"rp2010_projection":0.000714,"improvement_rate":0.0864276569,"survive_to_nextyear_2000":0.999219,"survive_to65_2000":0.917283738948602,"survive_to_nextyear_2010":0.9992865,"survive_to65_2010":0.926519471777667},"39":{"rp2000":0.000835,"rp2010_projection":0.000755,"improvement_rate":0.0958657879,"survive_to_nextyear_2000":0.9991655,"survive_to65_2000":0.918000697493344,"survive_to_nextyear_2010":0.9992455,"survive_to65_2010":0.927181015432178},"40":{"rp2000":0.000893,"rp2010_projection":0.000802,"improvement_rate":0.1019607843,"survive_to_nextyear_2000":0.9991075,"survive_to65_2000":0.918767408896068,"survive_to_nextyear_2010":0.9991985,"survive_to65_2010":0.927881101723429},"41":{"rp2000":0.000958,"rp2010_projection":0.000854,"improvement_rate":0.108559499,"survive_to_nextyear_2000":0.999042,"survive_to65_2000":0.919588141312189,"survive_to_nextyear_2010":0.999146,"survive_to65_2010":0.928625394977503},"42":{"rp2000":0.001034,"rp2010_projection":0.000916,"improvement_rate":0.114175133,"survive_to_nextyear_2000":0.9989665,"survive_to65_2000":0.92046995152575,"survive_to_nextyear_2010":0.9990845,"survive_to65_2010":0.929419118905048},"43":{"rp2000":0.001118,"rp2010_projection":0.000985,"improvement_rate":0.1194096601,"survive_to_nextyear_2000":0.998882,"survive_to65_2000":0.92142224141225,"survive_to_nextyear_2010":0.9990155,"survive_to65_2010":0.930270781805791},"44":{"rp2000":0.001213,"rp2010_projection":0.001062,"improvement_rate":0.1248969497,"survive_to_nextyear_2000":0.998787,"survive_to65_2000":0.922453544474973,"survive_to_nextyear_2010":0.9989385,"survive_to65_2010":0.931187535934919},"45":{"rp2000":0.001316,"rp2010_projection":0.00114,"improvement_rate":0.1337386018,"survive_to_nextyear_2000":0.998684,"survive_to65_2000":0.923573839542338,"survive_to_nextyear_2010":0.99886,"survive_to65_2010":0.932177041864859},"46":{"rp2000":0.00142,"rp2010_projection":0.001217,"improvement_rate":0.1430081014,"survive_to_nextyear_2000":0.9985805,"survive_to65_2000":0.924790864319783,"survive_to_nextyear_2010":0.9987835,"survive_to65_2010":0.933240936532506},"47":{"rp2000":0.00153,"rp2010_projection":0.001299,"improvement_rate":0.1513071895,"survive_to_nextyear_2000":0.99847,"survive_to65_2000":0.926105471035918,"survive_to_nextyear_2010":0.9987015,"survive_to65_2010":0.934377606891289},"48":{"rp2000":0.001647,"rp2010_projection":0.00139,"improvement_rate":0.1563448695,"survive_to_nextyear_2000":0.998353,"survive_to65_2000":0.927524583648901,"survive_to_nextyear_2010":0.9986105,"survive_to65_2010":0.935592473718412},"49":{"rp2000":0.001773,"rp2010_projection":0.001487,"improvement_rate":0.1610719323,"survive_to_nextyear_2000":0.9982275,"survive_to65_2000":0.929054736800412,"survive_to_nextyear_2010":0.998513,"survive_to65_2010":0.93689428833205},"50":{"rp2000":0.001907,"rp2010_projection":0.001598,"improvement_rate":0.1622968013,"survive_to_nextyear_2000":0.998093,"survive_to65_2000":0.930704410367788,"survive_to_nextyear_2010":0.9984025,"survive_to65_2010":0.93828952485551},"51":{"rp2000":0.002151,"rp2010_projection":0.001799,"improvement_rate":0.1634503604,"survive_to_nextyear_2000":0.9978495,"survive_to65_2000":0.932482654790474,"survive_to_nextyear_2010":0.998201,"survive_to65_2010":0.939790840723566},"52":{"rp2000":0.002343,"rp2010_projection":0.001966,"improvement_rate":0.1607257204,"survive_to_nextyear_2000":0.9976575,"survive_to65_2000":0.934492280439559,"survive_to_nextyear_2010":0.998034,"survive_to65_2010":0.941484571467636},"53":{"rp2000":0.002562,"rp2010_projection":0.00217,"improvement_rate":0.1530353309,"survive_to_nextyear_2000":0.9974385,"survive_to65_2000":0.936686468492002,"survive_to_nextyear_2010":0.9978305,"survive_to65_2010":0.943339176288219},"54":{"rp2000":0.00281,"rp2010_projection":0.002402,"improvement_rate":0.1453736655,"survive_to_nextyear_2000":0.99719,"survive_to65_2000":0.939091952528403,"survive_to_nextyear_2010":0.9975985,"survive_to65_2010":0.94539020032783},"55":{"rp2000":0.003171,"rp2010_projection":0.002749,"improvement_rate":0.1329443305,"survive_to_nextyear_2000":0.9968295,"survive_to65_2000":0.941738236974301,"survive_to_nextyear_2010":0.997251,"survive_to65_2010":0.947666020275522},"56":{"rp2000":0.003645,"rp2010_projection":0.003206,"improvement_rate":0.1204389575,"survive_to_nextyear_2000":0.996355,"survive_to65_2000":0.944733514582284,"survive_to_nextyear_2010":0.996794,"survive_to65_2010":0.95027833541959},"57":{"rp2000":0.004086,"rp2010_projection":0.003631,"improvement_rate":0.1112470934,"survive_to_nextyear_2000":0.9959145,"survive_to65_2000":0.948189665914542,"survive_to_nextyear_2010":0.996369,"survive_to65_2010":0.953334726552919},"58":{"rp2000":0.004598,"rp2010_projection":0.00411,"improvement_rate":0.1062418443,"survive_to_nextyear_2000":0.995402,"survive_to65_2000":0.952079386247054,"survive_to_nextyear_2010":0.9958905,"survive_to65_2010":0.956808899667612},"59":{"rp2000":0.005193,"rp2010_projection":0.004642,"improvement_rate":0.1062006547,"survive_to_nextyear_2000":0.994807,"survive_to65_2000":0.956477268728669,"survive_to_nextyear_2010":0.9953585,"survive_to65_2010":0.960757131097858},"60":{"rp2000":0.005901,"rp2010_projection":0.005275,"improvement_rate":0.1060837146,"survive_to_nextyear_2000":0.994099,"survive_to65_2000":0.961470183391019,"survive_to_nextyear_2010":0.994725,"survive_to65_2010":0.965237279932666},"61":{"rp2000":0.006745,"rp2010_projection":0.006065,"improvement_rate":0.1008895478,"survive_to_nextyear_2000":0.993255,"survive_to65_2000":0.967177497805569,"survive_to_nextyear_2010":0.9939355,"survive_to65_2010":0.970355907343905},"62":{"rp2000":0.007707,"rp2010_projection":0.006931,"improvement_rate":0.1007525626,"survive_to_nextyear_2000":0.992293,"survive_to65_2000":0.973745410600067,"survive_to_nextyear_2010":0.9930695,"survive_to65_2010":0.976276536398896},"63":{"rp2000":0.00883,"rp2010_projection":0.007985,"improvement_rate":0.0957531144,"survive_to_nextyear_2000":0.99117,"survive_to65_2000":0.981308354085,"survive_to_nextyear_2010":0.9920155,"survive_to65_2010":0.98308984053875},"64":{"rp2000":0.00995,"rp2010_projection":0.008998,"improvement_rate":0.0956832002,"survive_to_nextyear_2000":0.9900505,"survive_to65_2000":0.9900505,"survive_to_nextyear_2010":0.9910025,"survive_to65_2010":0.9910025},"65":{"rp2000":0.011222,"rp2010_projection":0.010147,"improvement_rate":0.0957982444,"survive_to_nextyear_2000":0.9887785,"survive_to65_2000":1,"survive_to_nextyear_2010":0.9898535,"survive_to65_2010":1},"66":{"rp2000":0.012682,"rp2010_projection":0.01153,"improvemnet_rate":0.0908015613,"survive_to_nextyear_2000":0.987319,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.98847,"survive_to_65_2010":1},"67":{"rp2000":0.014119,"rp2010_projection":0.012836,"improvemnet_rate":0.0909058715,"survive_to_nextyear_2000":0.985881,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.987165,"survive_to_65_2010":1},"68":{"rp2000":0.015658,"rp2010_projection":0.014155,"improvemnet_rate":0.0960212032,"survive_to_nextyear_2000":0.984342,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.985846,"survive_to_65_2010":1},"69":{"rp2000":0.017331,"rp2010_projection":0.015666,"improvemnet_rate":0.0960994749,"survive_to_nextyear_2000":0.982669,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.984335,"survive_to_65_2010":1},"70":{"rp2000":0.019474,"rp2010_projection":0.017507,"improvemnet_rate":0.1010064702,"survive_to_nextyear_2000":0.980526,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.982493,"survive_to_65_2010":1},"71":{"rp2000":0.021575,"rp2010_projection":0.019309,"improvemnet_rate":0.1050082273,"survive_to_nextyear_2000":0.978426,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.980691,"survive_to_65_2010":1},"72":{"rp2000":0.023973,"rp2010_projection":0.021456,"improvemnet_rate":0.1049931173,"survive_to_nextyear_2000":0.976027,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.978544,"survive_to_65_2010":1},"73":{"rp2000":0.026679,"rp2010_projection":0.023769,"improvemnet_rate":0.1090765973,"survive_to_nextyear_2000":0.973322,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.976232,"survive_to_65_2010":1},"74":{"rp2000":0.029679,"rp2010_projection":0.026438,"improvemnet_rate":0.1092017925,"survive_to_nextyear_2000":0.970321,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.973562,"survive_to_65_2010":1},"75":{"rp2000":0.03297,"rp2010_projection":0.029398,"improvemnet_rate":0.108340916,"survive_to_nextyear_2000":0.96703,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.970602,"survive_to_65_2010":1},"76":{"rp2000":0.036568,"rp2010_projection":0.0326,"improvemnet_rate":0.1084979832,"survive_to_nextyear_2000":0.963433,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.9674,"survive_to_65_2010":1},"77":{"rp2000":0.040506,"rp2010_projection":0.036472,"improvemnet_rate":0.0995790695,"survive_to_nextyear_2000":0.959495,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.963528,"survive_to_65_2010":1},"78":{"rp2000":0.044859,"rp2010_projection":0.04062,"improvemnet_rate":0.0944960877,"survive_to_nextyear_2000":0.955141,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.95938,"survive_to_65_2010":1},"79":{"rp2000":0.049717,"rp2010_projection":0.045276,"improvemnet_rate":0.0893264811,"survive_to_nextyear_2000":0.950284,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.954725,"survive_to_65_2010":1},"80":{"rp2000":0.055124,"rp2010_projection":0.05049,"improvemnet_rate":0.084056709,"survive_to_nextyear_2000":0.944877,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.94951,"survive_to_65_2010":1},"81":{"rp2000":0.061411,"rp2010_projection":0.056575,"improvemnet_rate":0.0787487482,"survive_to_nextyear_2000":0.93859,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.943426,"survive_to_65_2010":1},"82":{"rp2000":0.06839,"rp2010_projection":0.063375,"improvemnet_rate":0.0733367451,"survive_to_nextyear_2000":0.93161,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.936626,"survive_to_65_2010":1},"83":{"rp2000":0.076112,"rp2010_projection":0.07053,"improvemnet_rate":0.0733392895,"survive_to_nextyear_2000":0.923888,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.92947,"survive_to_65_2010":1},"84":{"rp2000":0.084648,"rp2010_projection":0.078906,"improvemnet_rate":0.0678397599,"survive_to_nextyear_2000":0.915352,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.921095,"survive_to_65_2010":1},"85":{"rp2000":0.094102,"rp2010_projection":0.088034,"improvemnet_rate":0.064483563,"survive_to_nextyear_2000":0.905899,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.911967,"survive_to_65_2010":1},"86":{"rp2000":0.104587,"rp2010_projection":0.09831,"improvemnet_rate":0.0600125255,"survive_to_nextyear_2000":0.895414,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.90169,"survive_to_65_2010":1},"87":{"rp2000":0.11619,"rp2010_projection":0.110325,"improvemnet_rate":0.0504819692,"survive_to_nextyear_2000":0.88381,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.889676,"survive_to_65_2010":1},"88":{"rp2000":0.128947,"rp2010_projection":0.123158,"improvemnet_rate":0.0448945881,"survive_to_nextyear_2000":0.871054,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.876843,"survive_to_65_2010":1},"89":{"rp2000":0.142787,"rp2010_projection":0.136956,"improvemnet_rate":0.0408405527,"survive_to_nextyear_2000":0.857213,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.863045,"survive_to_65_2010":1},"90":{"rp2000":0.157545,"rp2010_projection":0.151993,"improvemnet_rate":0.0352407249,"survive_to_nextyear_2000":0.842455,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.848007,"survive_to_65_2010":1},"91":{"rp2000":0.172187,"rp2010_projection":0.166123,"improvemnet_rate":0.0352176274,"survive_to_nextyear_2000":0.827814,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.833878,"survive_to_65_2010":1},"92":{"rp2000":0.187112,"rp2010_projection":0.181574,"improvemnet_rate":0.0295973257,"survive_to_nextyear_2000":0.812889,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.818427,"survive_to_65_2010":1},"93":{"rp2000":0.202048,"rp2010_projection":0.196901,"improvemnet_rate":0.0254742078,"survive_to_nextyear_2000":0.797953,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.8031,"survive_to_65_2010":1},"94":{"rp2000":0.216746,"rp2010_projection":0.211225,"improvemnet_rate":0.0254745186,"survive_to_nextyear_2000":0.783254,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.788776,"survive_to_65_2010":1},"95":{"rp2000":0.231,"rp2010_projection":0.226422,"improvemnet_rate":0.0198203463,"survive_to_nextyear_2000":0.769,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.773579,"survive_to_65_2010":1},"96":{"rp2000":0.244642,"rp2010_projection":0.239793,"improvemnet_rate":0.0198207994,"survive_to_nextyear_2000":0.755358,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.760207,"survive_to_65_2010":1},"97":{"rp2000":0.257546,"rp2010_projection":0.253503,"improvemnet_rate":0.0156981665,"survive_to_nextyear_2000":0.742454,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.746497,"survive_to_65_2010":1},"98":{"rp2000":0.269622,"rp2010_projection":0.266938,"improvemnet_rate":0.0099546957,"survive_to_nextyear_2000":0.730379,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.733063,"survive_to_65_2010":1},"99":{"rp2000":0.280797,"rp2010_projection":0.278002,"improvemnet_rate":0.00995381,"survive_to_nextyear_2000":0.719203,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.721998,"survive_to_65_2010":1},"100":{"rp2000":0.291012,"rp2010_projection":0.288115,"improvemnet_rate":0,"survive_to_nextyear_2000":0.708989,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.711886,"survive_to_65_2010":1},"101":{"rp2000":0.301731,"rp2010_projection":0.301731,"improvemnet_rate":0,"survive_to_nextyear_2000":0.698269,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.698269,"survive_to_65_2010":1},"102":{"rp2000":0.30864,"rp2010_projection":0.313092,"improvemnet_rate":0,"survive_to_nextyear_2000":0.69136,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.686909,"survive_to_65_2010":1},"103":{"rp2000":0.324542,"rp2010_projection":0.324542,"improvemnet_rate":0,"survive_to_nextyear_2000":0.675458,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.675458,"survive_to_65_2010":1},"104":{"rp2000":0.335529,"rp2010_projection":0.335529,"improvemnet_rate":0,"survive_to_nextyear_2000":0.664471,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.664471,"survive_to_65_2010":1},"105":{"rp2000":0.345501,"rp2010_projection":0.345501,"improvemnet_rate":0,"survive_to_nextyear_2000":0.654499,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.654499,"survive_to_65_2010":1},"106":{"rp2000":0.353906,"rp2010_projection":0.353906,"improvemnet_rate":0,"survive_to_nextyear_2000":0.646095,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.646095,"survive_to_65_2010":1},"107":{"rp2000":0.361363,"rp2010_projection":0.361363,"improvemnet_rate":0,"survive_to_nextyear_2000":0.638638,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.638638,"survive_to_65_2010":1},"108":{"rp2000":0.368721,"rp2010_projection":0.368721,"improvemnet_rate":0,"survive_to_nextyear_2000":0.63128,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.63128,"survive_to_65_2010":1},"109":{"rp2000":0.375772,"rp2010_projection":0.375772,"improvemnet_rate":0,"survive_to_nextyear_2000":0.624228,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.624228,"survive_to_65_2010":1},"110":{"rp2000":0.382309,"rp2010_projection":0.382309,"improvemnet_rate":0,"survive_to_nextyear_2000":0.617692,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.617692,"survive_to_65_2010":1},"111":{"rp2000":0.388123,"rp2010_projection":0.388123,"improvemnet_rate":0,"survive_to_nextyear_2000":0.611877,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.611877,"survive_to_65_2010":1},"112":{"rp2000":0.393008,"rp2010_projection":0.393008,"improvemnet_rate":0,"survive_to_nextyear_2000":0.606993,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.606993,"survive_to_65_2010":1},"113":{"rp2000":0.396754,"rp2010_projection":0.396754,"improvemnet_rate":0,"survive_to_nextyear_2000":0.603247,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.603247,"survive_to_65_2010":1},"114":{"rp2000":0.399154,"rp2010_projection":0.399154,"improvemnet_rate":0,"survive_to_nextyear_2000":0.600846,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.600846,"survive_to_65_2010":1},"115":{"rp2000":0.4,"rp2010_projection":0.4,"improvemnet_rate":0,"survive_to_nextyear_2000":0.6,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.6,"survive_to_65_2010":1},"116":{"rp2000":0.4,"rp2010_projection":0.4,"improvemnet_rate":0,"survive_to_nextyear_2000":0.6,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.6,"survive_to_65_2010":1},"117":{"rp2000":0.4,"rp2010_projection":0.4,"improvemnet_rate":0,"survive_to_nextyear_2000":0.6,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.6,"survive_to_65_2010":1},"118":{"rp2000":0.4,"rp2010_projection":0.4,"improvemnet_rate":0,"survive_to_nextyear_2000":0.6,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.6,"survive_to_65_2010":1},"119":{"rp2000":0.4,"rp2010_projection":0.4,"improvemnet_rate":0,"survive_to_nextyear_2000":0.6,"survive_to_65_2000":1,"survive_to_nextyear_2010":0.6,"survive_to_65_2010":1},"120":{"rp2000":1,"rp2010_projection":1,"improvemnet_rate":0,"survive_to_nextyear_2000":0,"survive_to_65_2000":1,"survive_to_nextyear_2010":0,"survive_to_65_2010":1}};
	var temporary_annuity_2000 = {"30":25.4673627702,"31":24.9378391194,"32":24.399329391,"33":23.8517025483,"34":23.2948053351,"35":22.7283831253,"36":22.1521755758,"37":21.5658841147,"38":20.9692062153,"39":20.3618863243,"40":19.743681036,"41":19.1143949927,"42":18.4738740016,"43":17.8219887629,"44":17.1585680564,"45":16.483441113,"46":15.7963695337,"47":15.0969764754,"48":14.3849661619,"49":13.6600107309,"50":12.9217827178,"51":12.169930071,"52":11.4052103735,"53":10.6264275039,"54":9.8332460714,"55":9.0252721062,"56":8.2026989918,"57":7.3654460235,"58":6.5121541846,"59":5.6420994671,"60":4.7543757226,"61":3.8479195738,"62":2.9213584682,"63":1.972815,"64":1,"65":1};
	var temporary_annuity_2010 = {"30":25.4673627702,"31":24.990993821,"32":24.4529217391,"33":23.9056852354,"34":23.3490755319,"35":22.7828425003,"36":22.2067194259,"37":21.6204238337,"38":21.0236373422,"39":20.4160086426,"40":19.7972854802,"41":19.167313846,"42":18.5259144835,"43":17.8729548054,"44":17.2082539692,"45":16.5316183948,"46":15.842728509,"47":15.1411992592,"48":14.4267474711,"49":13.6991172525,"50":12.9579917721,"51":12.2031087246,"52":11.4350598071,"53":10.6528913123,"54":9.8564048073,"55":9.045228902,"56":8.219621413,"57":7.3794993599,"58":6.523554298,"59":5.6509950678,"60":4.7608471639,"61":3.8521265117,"62":2.9236708211,"63":1.9736448426,"64":1,"65":1};
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%d-%b-%y").parse;

	var x = d3.scale.linear()
		.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var svg = d3.select(".graph").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var salaryTotalLine = d3.svg.line()
				.x(function(d) { return x(d.age); })
				.y(function(d) { return y(d.sum); });

	var salaryAverageLine = d3.svg.line()
				.x(function(d) { return x(d.age); })
				.y(function(d) { return y(d.sum/d.count); });

	var employeesByAgeLine = d3.svg.line()
				.x(function(d) { return x(d.age); })
				.y(function(d) { return y(d.count); });

	var annuity_factor_2000 = function(){
		var output = 0;
		for (var i = 65 ; i <= 120; i++) {
			output += global_discount_factor(i)*survive_past65_2000(i);
		};
		return output;
	};

	var annuity_factor_2010 = function(){
		var output = 0;
		for (var i = 65 ; i <= 120; i++) {
			output += global_discount_factor(i)*survive_past65_2010(i);
		};
		return output;
	};

	var global_discount_factor = function(age){
		return 1/(Math.pow((1+interest_rate),(age-65)))
	}

	var survive_past65_2000 = function(age){
		if(age == 65){
			return 1;
		}
		return mortality[age-1].survive_to_nextyear_2000*survive_past65_2000(age-1);
	}

	var survive_past65_2010 = function(age){
		if(age == 65){
			return 1;
		}
		return mortality[age-1].survive_to_nextyear_2010*survive_past65_2010(age-1);
	}
	console.log('2000',annuity_factor_2000());
	function Employee(in_age,yos,ben){
		var benefit_factor = base_benefit_factor;
		if(typeof ben == 'number'){
			benefit_factor = ben;
		}
		var age = in_age;
		var years_of_service = yos;
		var salary = function(){
				var current_salary = base_salary;
				for(var x = 0;x <=years_of_service;x++){
					if(x > 0){
						current_salary = current_salary+(current_salary*salary_growth_rate);
					}
				}
				return current_salary;
		};
		

		var initial_accumulated_salary = function(){
			return 1
		}
		var accumulated_salary=function(years_of_service_adjustment){
			if(typeof years_of_service_adjustment === 'undefined'){
				years_of_service_adjustment = 0;
			}
			var current_salary = base_salary;
			var current_accumulated_salary = 0;
			for(var x = 0;x <= years_of_service+years_of_service_adjustment;x++){
				if(x > 0){
					current_salary = current_salary+(current_salary*salary_growth_rate);
				}
				current_accumulated_salary += current_salary;
			}
			return current_accumulated_salary;
		};

		var accumulated_salary_fixed=function(temp){
			var current_salary = base_salary;
			var current_accumulated_salary = 0;
			for(var x = 0;x <= temp;x++){
				if(x > 0){
					current_salary = current_salary+(current_salary*salary_growth_rate);
				}
				current_accumulated_salary += current_salary;
			}
			return current_accumulated_salary;
		};

		var years_to_retirement=function(){
			return retirement_age - age;
		};

		var survive_to65_2000=function(fixed_age){
			if(typeof fixed_age == 'undefined'){
				fixed_age = age;
			}
			return mortality[fixed_age].survive_to65_2000;
		};

		var survive_to65_2010=function(fixed_age){
			if(typeof fixed_age == 'undefined'){
				fixed_age = age;
			}
			return mortality[fixed_age].survive_to65_2010;
		};

		var accumulated_benefits=function(){
			var numerator = 0;
			if(years_of_service <= 5){
				numerator = ((accumulated_salary()-base_salary)/years_of_service)*benefit_factor*years_of_service;
			}else{
				numerator = benefit_factor*years_of_service*(accumulated_salary() - accumulated_salary(-5))/5;
			}
			if(isNaN(numerator)){
				return 0;
			}else{
				return numerator;
			}
		};

		var total_benefits=function(){
			return benefit_factor*life_time_work*(accumulated_salary(years_to_retirement()) - accumulated_salary(years_to_retirement()-5))/5;
		};

		var initial_total_benefits=function(){
			return benefit_factor*life_time_work*(accumulated_salary_fixed(35) - accumulated_salary_fixed(30))/5;
		};

		var discount_factor = function(){
			var factor = 1/Math.pow(1+interest_rate,years_to_retirement());
			return factor;
		};

		var initial_discount_factor = function(){
			var factor = 1/Math.pow(1+interest_rate,35);
			return factor;
		};

		var future_benefits_2000 = function(){
			return total_benefits()*survive_to65_2000()*discount_factor()*annuity_factor_2000();
		};

		var initial_future_benefits_2000 =function(){
			//console.log(initial_total_benefits()+'*'+survive_to65_2000(base_age)+'*'+initial_discount_factor()+'*'+annuity_factor_2000() +'=' +initial_total_benefits()*survive_to65_2000(base_age)*initial_discount_factor()*annuity_factor_2000());
			//return 2.88
			return initial_total_benefits()*survive_to65_2000(base_age)*initial_discount_factor()*annuity_factor_2000();
		};

		var initial_future_benefits_2010 =function(){
			return initial_total_benefits()*survive_to65_2010(base_age)*initial_discount_factor()*annuity_factor_2010();
		};

		var future_benefits_2010 = function(){
			return total_benefits()*survive_to65_2010()*discount_factor()*annuity_factor_2010();
		};

		var puc_annual_accrued_benefits = function(){
			return total_benefits()/life_time_work;
		};

		var puc_accumulated_annual_accrued_benefits = function(){
			return years_of_service*puc_annual_accrued_benefits();
		};

		var puc_accumulated_accrued_liabilities_2000 = function(){
			return future_benefits_2000()*((age-amoritization_period)/(retirement_age-amoritization_period));
		};

		var puc_accumulated_accrued_liabilities_2010 = function(){
			return future_benefits_2010()*((age-amoritization_period)/(retirement_age-amoritization_period));
		};

		var puc_normal_cost_2000 = function(){
			return puc_annual_accrued_benefits()*discount_factor()*survive_to65_2000()*annuity_factor_2000();
		};

		var puc_normal_cost_2010 = function(){
			return puc_annual_accrued_benefits()*discount_factor()*survive_to65_2010()*annuity_factor_2010();
		};

		var ean_normal_cost_2000 = function(){
			//console.log('ean calc:'+initial_future_benefits_2000()+'/('+base_salary+'*'+temporary_annuity_2000[base_age]+'))*'+salary()+'='+(initial_future_benefits_2000()/(base_salary*temporary_annuity_2000[base_age]))*salary());
			return (initial_future_benefits_2000()/(base_salary*temporary_annuity_2000[base_age]))*salary();
		};

		var ean_normal_cost_2010 = function(){
			return (initial_future_benefits_2010()/(base_salary*temporary_annuity_2010[base_age]))*salary();
		};

		var ean_accumulated_accrued_liabilities_2000 = function(){
			return future_benefits_2000()-(ean_normal_cost_2000()*temporary_annuity_2000[age]);
			//return (ean_normal_cost_2000()*temporary_annuity_2000[age]);
			//return ' '+future_benefits_2000()+'-('+ean_normal_cost_2000()+'*'+temporary_annuity_2000[age]+')';
		};

		var ean_accumulated_accrued_liabilities_2010 = function(){
			return future_benefits_2010()-(ean_normal_cost_2010()*temporary_annuity_2010[age]);
			//return (ean_normal_cost_2010()*temporary_annuity_2010[age]);
		};

		return {
			get_age:function(){
				return age;
			},
			get_years_of_service:function(){
				return years_of_service;
			},
			get_salary:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(salary(),percision);
			},
			get_accumulated_salary:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(accumulated_salary(),percision);
			},
			get_years_to_retirement:function(){
				return years_to_retirement();
			},
			get_survive_to65_2000:function(percision){
				if(typeof percision == 'undefined'){ percision = 8;}
				return DecimalRound(survive_to65_2000(),percision);
			},
			get_survive_to65_2010:function(percision){
				if(typeof percision == 'undefined'){ percision = 8;}
				return DecimalRound(survive_to65_2010(),percision);
			},
			get_accumulated_benefits:function(percision){
				if(typeof percision == 'undefined'){ percision = 4;}
				return DecimalRound(accumulated_benefits(),percision);
			},
			get_benefit_factor:function(percision){
				if(typeof percision == 'undefined'){ percision = 4;}
				return DecimalRound(benefit_factor,percision);
			},
			get_discount_factor:function(percision){
				if(typeof percision == 'undefined'){ percision = 4;}
				return DecimalRound(discount_factor(),percision);
			},
			get_future_benefits_2000:function(percision){
				if(typeof percision == 'undefined'){ percision = 4;}
				return DecimalRound(future_benefits_2000(),percision);
			},
			get_future_benefits_2010:function(percision){
				if(typeof percision == 'undefined'){ percision = 4;}
				return DecimalRound(future_benefits_2010(),percision);
			},
			get_puc_annual_accrued_benefits:function(percision){
				if(typeof percision == 'undefined'){ percision = 4;}
				return DecimalRound(puc_annual_accrued_benefits(),percision);
			},
			get_puc_accumulated_annual_accrued_benefits:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(puc_accumulated_annual_accrued_benefits(),percision);
			},
			get_puc_accumulated_accrued_liabilities_2000:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(puc_accumulated_accrued_liabilities_2000(),percision);
			},
			get_puc_accumulated_accrued_liabilities_2010:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(puc_accumulated_accrued_liabilities_2010(),percision);
			},
			get_puc_normal_cost_2000:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(puc_normal_cost_2000(),percision);
			},
			get_puc_normal_cost_2010:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(puc_normal_cost_2010(),percision);
			},
			get_temporary_annuity_2000:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(temporary_annuity_2000[age],percision);
			},
			get_temporary_annuity_2010:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(temporary_annuity_2010[age],percision);
			},
			get_ean_normal_cost_2000:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(ean_normal_cost_2000(),percision);
			},
			get_ean_normal_cost_2010:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(ean_normal_cost_2010(),percision);
			},
			get_ean_accumulated_accrued_liabilities_2000:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(ean_accumulated_accrued_liabilities_2000(),percision);
			},
			get_ean_accumulated_accrued_liabilities_2010:function(percision){
				if(typeof percision == 'undefined'){ percision = 2;}
				return DecimalRound(ean_accumulated_accrued_liabilities_2010(),percision);
			}
		};
	}

	return {
		init:function(empdata){
			empdata.forEach(function(emp){
				employees.push(new Employee(emp.age,emp.yos));
			});
		},
		employees:function(){
			return employees;
		},
		interest_rate:function(input_interest){
			if(typeof input_interest == 'undefined'){
				return interest_rate*100;
			}
			else{
				interest_rate = input_interest/100;
				return interest_rate;
			}
		},
		inflation_rate:function(input_inflation){
			if(typeof input_inflation == 'undefined'){
				return inflation_rate*100;
			}
			else{
				inflation_rate = input_inflation/100;
				return inflation_rate;
			}
		},
		salary_growth_rate:function(input_salary){
			if(typeof input_salary == 'undefined'){
				return salary_growth_rate*100;
			}
			else{
				salary_growth_rate = input_salary/100;
				return salary_growth_rate;
			}
		},
		base_benefit_factor:function(input_benefit){
			if(typeof input_benefit == 'undefined'){
				return base_benefit_factor*100;
			}
			else{
				base_benefit_factor = input_benefit/100;
				return base_benefit_factor;
			}
		},
		get_salaries:function(){
			var output = {};
			employees.forEach(function(employee){
				if(output[employee.get_age()]){
					output[employee.get_age()].count +=1;
					output[employee.get_age()].sum += employee.get_salary();
				}else{
					output[employee.get_age()] = {"count":0,"sum":0};
					output[employee.get_age()].count +=1;
					output[employee.get_age()].sum += employee.get_salary();
				}
			});
			var output_array = [];
			$.each(output, function(index, value) {
				value['age'] = index*1;
				value.average = function(){
					return this.sum/this.count;
				};
				output_array.push(value);
			});
			return output_array;
		},
		drawGraph: function (data){
			x.domain(d3.extent(data, function(d) { return d.age; }));
			y.domain([0,d3.extent(data, function(d) { return d.sum })[1]]);


			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);

			svg.append("g")
				.attr("class", "y axis")
				.call(yAxis)
			.append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Salary ($)");

			svg.append("path")
				.datum(data)
				.attr("class", "salaryTotalLine line")
				.attr("d", salaryTotalLine)
				.attr("stroke","#333");

			svg.append("path")
				.datum(data)
				.attr("class", "salaryAverageLine line")
				.attr("d", salaryAverageLine)
				.attr("stroke","#f00");
				employeesByAgeLine

			svg.append("path")
				.datum(data)
				.attr("class", "employeesByAgeLine line")
				.attr("d", employeesByAgeLine)
				.attr("stroke","#0f0");
		},
		updateSalary:function(data){
			y.domain([0,d3.extent(data, function(d) { return d.sum })[1]]);
			svg.selectAll(".y.axis").transition().call(yAxis);
			svg.selectAll(".salaryTotalLine")
				.datum(data)
				.transition()
					.attr("d", salaryTotalLine);

			svg.selectAll(".salaryAverageLine")
				.datum(data)
				.transition()
					.attr("d", salaryAverageLine);

			svg.selectAll(".employeesByAgeLine")
				.datum(data)
				.transition()
					.attr("d", employeesByAgeLine);
		}

	};

}());

function drawGraph(data){

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.age); })
    .y(function(d) { return y(d.sum); });

var svg = d3.select(".graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(data, function(d) { return d.age; }));
  y.domain(d3.extent(data, function(d) { return d.sum; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Salary ($)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

}

function DecimalRound(num,places){
	return Math.round( num * Math.pow(10,places) ) / Math.pow(10,places);
}