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
	var annuity_factor_2000=7.5073936338;
	var annuity_factor_2010=9.8565103522;
	var employees=[];
	var mortality={"30":{"rp2000":0.000354,"rp2010_projection":0.000331,"improvement_rate":0.0663841808,"survive_to_nextyear_2000":0.9996460000000000,"survive_to65_2000":0.9133243858238320,"survive_to_nextyear_2010":0.9996695000000000,"survive_to65_2010":0.9227921276954180},"31":{"rp2000":0.000403,"rp2010_projection":0.000379,"improvement_rate":0.0595533499,"survive_to_nextyear_2000":0.9995970000000000,"survive_to65_2000":0.9136478171511040,"survive_to_nextyear_2010":0.9996210000000000,"survive_to65_2010":0.9230972113237600},"32":{"rp2000":0.000456,"rp2010_projection":0.000429,"improvement_rate":0.0592105263,"survive_to_nextyear_2000":0.9995440000000000,"survive_to65_2000":0.9140161656658670,"survive_to_nextyear_2010":0.9995710000000000,"survive_to65_2010":0.9234471978117310},"33":{"rp2000":0.000513,"rp2010_projection":0.000480,"improvement_rate":0.0634146341,"survive_to_nextyear_2000":0.9994875000000000,"survive_to65_2000":0.9144331471809820,"survive_to_nextyear_2010":0.9995200000000000,"survive_to65_2010":0.9238435266846790},"34":{"rp2000":0.000569,"rp2010_projection":0.000531,"improvement_rate":0.0668425682,"survive_to_nextyear_2000":0.9994315000000000,"survive_to65_2000":0.9149020344736490,"survive_to_nextyear_2010":0.9994695000000000,"survive_to65_2010":0.9242871845332550},"35":{"rp2000":0.000624,"rp2010_projection":0.000580,"improvement_rate":0.0705128205,"survive_to_nextyear_2000":0.9993760000000000,"survive_to65_2000":0.9154224521376900,"survive_to_nextyear_2010":0.9994200000000000,"survive_to65_2010":0.9247777791450910},"36":{"rp2000":0.000678,"rp2010_projection":0.000628,"improvement_rate":0.0730627306,"survive_to_nextyear_2000":0.9993225000000000,"survive_to65_2000":0.9159940324139160,"survive_to_nextyear_2010":0.9993720000000000,"survive_to65_2010":0.9253144615327800},"37":{"rp2000":0.000729,"rp2010_projection":0.000673,"improvement_rate":0.0768175583,"survive_to_nextyear_2000":0.9992710000000000,"survive_to65_2000":0.9166150391029080,"survive_to_nextyear_2010":0.9993270000000000,"survive_to65_2010":0.9258959241731610},"38":{"rp2000":0.000781,"rp2010_projection":0.000714,"improvement_rate":0.0864276569,"survive_to_nextyear_2000":0.9992190000000000,"survive_to65_2000":0.9172837389486020,"survive_to_nextyear_2010":0.9992865000000000,"survive_to65_2010":0.9265194717776670},"39":{"rp2000":0.000835,"rp2010_projection":0.000755,"improvement_rate":0.0958657879,"survive_to_nextyear_2000":0.9991655000000000,"survive_to65_2000":0.9180006974933440,"survive_to_nextyear_2010":0.9992455000000000,"survive_to65_2010":0.9271810154321780},"40":{"rp2000":0.000893,"rp2010_projection":0.000802,"improvement_rate":0.1019607843,"survive_to_nextyear_2000":0.9991075000000000,"survive_to65_2000":0.9187674088960680,"survive_to_nextyear_2010":0.9991985000000000,"survive_to65_2010":0.9278811017234290},"41":{"rp2000":0.000958,"rp2010_projection":0.000854,"improvement_rate":0.108559499	,"survive_to_nextyear_2000":0.9990420000000000,"survive_to65_2000":0.9195881413121890,"survive_to_nextyear_2010":0.9991460000000000,"survive_to65_2010":0.9286253949775030},"42":{"rp2000":0.001034,"rp2010_projection":0.000916,"improvement_rate":0.114175133	,"survive_to_nextyear_2000":0.9989665000000000,"survive_to65_2000":0.9204699515257500,"survive_to_nextyear_2010":0.9990845000000000,"survive_to65_2010":0.9294191189050480},"43":{"rp2000":0.001118,"rp2010_projection":0.000985,"improvement_rate":0.1194096601,"survive_to_nextyear_2000":0.9988820000000000,"survive_to65_2000":0.9214222414122500,"survive_to_nextyear_2010":0.9990155000000000,"survive_to65_2010":0.9302707818057910},"44":{"rp2000":0.001213,"rp2010_projection":0.001062,"improvement_rate":0.1248969497,"survive_to_nextyear_2000":0.9987870000000000,"survive_to65_2000":0.9224535444749730,"survive_to_nextyear_2010":0.9989385000000000,"survive_to65_2010":0.9311875359349190},"45":{"rp2000":0.001316,"rp2010_projection":0.001140,"improvement_rate":0.1337386018,"survive_to_nextyear_2000":0.9986840000000000,"survive_to65_2000":0.9235738395423380,"survive_to_nextyear_2010":0.9988600000000000,"survive_to65_2010":0.9321770418648590},"46":{"rp2000":0.001420,"rp2010_projection":0.001217,"improvement_rate":0.1430081014,"survive_to_nextyear_2000":0.9985805000000000,"survive_to65_2000":0.9247908643197830,"survive_to_nextyear_2010":0.9987835000000000,"survive_to65_2010":0.9332409365325060},"47":{"rp2000":0.001530,"rp2010_projection":0.001299,"improvement_rate":0.1513071895,"survive_to_nextyear_2000":0.9984700000000000,"survive_to65_2000":0.9261054710359180,"survive_to_nextyear_2010":0.9987015000000000,"survive_to65_2010":0.9343776068912890},"48":{"rp2000":0.001647,"rp2010_projection":0.001390,"improvement_rate":0.1563448695,"survive_to_nextyear_2000":0.9983530000000000,"survive_to65_2000":0.9275245836489010,"survive_to_nextyear_2010":0.9986105000000000,"survive_to65_2010":0.9355924737184120},"49":{"rp2000":0.001773,"rp2010_projection":0.001487,"improvement_rate":0.1610719323,"survive_to_nextyear_2000":0.9982275000000000,"survive_to65_2000":0.9290547368004120,"survive_to_nextyear_2010":0.9985130000000000,"survive_to65_2010":0.9368942883320500},"50":{"rp2000":0.001907,"rp2010_projection":0.001598,"improvement_rate":0.1622968013,"survive_to_nextyear_2000":0.9980930000000000,"survive_to65_2000":0.9307044103677880,"survive_to_nextyear_2010":0.9984025000000000,"survive_to65_2010":0.9382895248555100},"51":{"rp2000":0.002151,"rp2010_projection":0.001799,"improvement_rate":0.1634503604,"survive_to_nextyear_2000":0.9978495000000000,"survive_to65_2000":0.9324826547904740,"survive_to_nextyear_2010":0.9982010000000000,"survive_to65_2010":0.9397908407235660},"52":{"rp2000":0.002343,"rp2010_projection":0.001966,"improvement_rate":0.1607257204,"survive_to_nextyear_2000":0.9976575000000000,"survive_to65_2000":0.9344922804395590,"survive_to_nextyear_2010":0.9980340000000000,"survive_to65_2010":0.9414845714676360},"53":{"rp2000":0.002562,"rp2010_projection":0.002170,"improvement_rate":0.1530353309,"survive_to_nextyear_2000":0.9974385000000000,"survive_to65_2000":0.9366864684920020,"survive_to_nextyear_2010":0.9978305000000000,"survive_to65_2010":0.9433391762882190},"54":{"rp2000":0.002810,"rp2010_projection":0.002402,"improvement_rate":0.1453736655,"survive_to_nextyear_2000":0.9971900000000000,"survive_to65_2000":0.9390919525284030,"survive_to_nextyear_2010":0.9975985000000000,"survive_to65_2010":0.9453902003278300},"55":{"rp2000":0.003171,"rp2010_projection":0.002749,"improvement_rate":0.1329443305,"survive_to_nextyear_2000":0.9968295000000000,"survive_to65_2000":0.9417382369743010,"survive_to_nextyear_2010":0.9972510000000000,"survive_to65_2010":0.9476660202755220},"56":{"rp2000":0.003645,"rp2010_projection":0.003206,"improvement_rate":0.1204389575,"survive_to_nextyear_2000":0.9963550000000000,"survive_to65_2000":0.9447335145822840,"survive_to_nextyear_2010":0.9967940000000000,"survive_to65_2010":0.9502783354195900},"57":{"rp2000":0.004086,"rp2010_projection":0.003631,"improvement_rate":0.1112470934,"survive_to_nextyear_2000":0.9959145000000000,"survive_to65_2000":0.9481896659145420,"survive_to_nextyear_2010":0.9963690000000000,"survive_to65_2010":0.9533347265529190},"58":{"rp2000":0.004598,"rp2010_projection":0.004110,"improvement_rate":0.1062418443,"survive_to_nextyear_2000":0.9954020000000000,"survive_to65_2000":0.9520793862470540,"survive_to_nextyear_2010":0.9958905000000000,"survive_to65_2010":0.9568088996676120},"59":{"rp2000":0.005193,"rp2010_projection":0.004642,"improvement_rate":0.1062006547,"survive_to_nextyear_2000":0.9948070000000000,"survive_to65_2000":0.9564772687286690,"survive_to_nextyear_2010":0.9953585000000000,"survive_to65_2010":0.9607571310978580},"60":{"rp2000":0.005901,"rp2010_projection":0.005275,"improvement_rate":0.1060837146,"survive_to_nextyear_2000":0.9940990000000000,"survive_to65_2000":0.9614701833910190,"survive_to_nextyear_2010":0.9947250000000000,"survive_to65_2010":0.9652372799326660},"61":{"rp2000":0.006745,"rp2010_projection":0.006065,"improvement_rate":0.1008895478,"survive_to_nextyear_2000":0.9932550000000000,"survive_to65_2000":0.9671774978055690,"survive_to_nextyear_2010":0.9939355000000000,"survive_to65_2010":0.9703559073439050},"62":{"rp2000":0.007707,"rp2010_projection":0.006931,"improvement_rate":0.1007525626,"survive_to_nextyear_2000":0.9922930000000000,"survive_to65_2000":0.9737454106000670,"survive_to_nextyear_2010":0.9930695000000000,"survive_to65_2010":0.9762765363988960},"63":{"rp2000":0.008830,"rp2010_projection":0.007985,"improvement_rate":0.0957531144,"survive_to_nextyear_2000":0.9911700000000000,"survive_to65_2000":0.9813083540850000,"survive_to_nextyear_2010":0.9920155000000000,"survive_to65_2010":0.9830898405387500},"64":{"rp2000":0.009950,"rp2010_projection":0.008998,"improvement_rate":0.0956832002,"survive_to_nextyear_2000":0.9900505000000000,"survive_to65_2000":0.9900505000000000,"survive_to_nextyear_2010":0.9910025000000000,"survive_to65_2010":0.9910025000000000},"65":{"rp2000":0.011222,"rp2010_projection":0.010147,"improvement_rate":0.0957982444,"survive_to_nextyear_2000":0.9887785000000000,"survive_to65_2000":1.0000000000000000,"survive_to_nextyear_2010":0.9898535000000000,"survive_to65_2010":1.0000000000000000}};
	var temporary_annuity_2000 = {"30":25.4673627702,"31":24.9378391194,"32":24.399329391,"33":23.8517025483,"34":23.2948053351,"35":22.7283831253,"36":22.1521755758,"37":21.5658841147,"38":20.9692062153,"39":20.3618863243,"40":19.743681036,"41":19.1143949927,"42":18.4738740016,"43":17.8219887629,"44":17.1585680564,"45":16.483441113,"46":15.7963695337,"47":15.0969764754,"48":14.3849661619,"49":13.6600107309,"50":12.9217827178,"51":12.169930071,"52":11.4052103735,"53":10.6264275039,"54":9.8332460714,"55":9.0252721062,"56":8.2026989918,"57":7.3654460235,"58":6.5121541846,"59":5.6420994671,"60":4.7543757226,"61":3.8479195738,"62":2.9213584682,"63":1.972815,"64":1,"65":1};
	var temporary_annuity_2010 = {"30":25.4673627702,"31":24.990993821,"32":24.4529217391,"33":23.9056852354,"34":23.3490755319,"35":22.7828425003,"36":22.2067194259,"37":21.6204238337,"38":21.0236373422,"39":20.4160086426,"40":19.7972854802,"41":19.167313846,"42":18.5259144835,"43":17.8729548054,"44":17.2082539692,"45":16.5316183948,"46":15.842728509,"47":15.1411992592,"48":14.4267474711,"49":13.6991172525,"50":12.9579917721,"51":12.2031087246,"52":11.4350598071,"53":10.6528913123,"54":9.8564048073,"55":9.045228902,"56":8.219621413,"57":7.3794993599,"58":6.523554298,"59":5.6509950678,"60":4.7608471639,"61":3.8521265117,"62":2.9236708211,"63":1.9736448426,"64":1,"65":1};
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

		var discount_factor = function(){
			var factor = 1/Math.pow(1+interest_rate,years_to_retirement());
			return factor;
		};

		var future_benefits_2000 = function(){
			return total_benefits()*survive_to65_2000()*discount_factor()*annuity_factor_2000;
		};

		var initial_future_benefits_2000 =function(){
			return total_benefits()*survive_to65_2000(base_age)*discount_factor()*annuity_factor_2000;
		};

		var initial_future_benefits_2010 =function(){
			return total_benefits()*survive_to65_2010(base_age)*discount_factor()*annuity_factor_2010;
		};

		var future_benefits_2010 = function(){
			return total_benefits()*survive_to65_2010()*discount_factor()*annuity_factor_2010;
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
			return puc_annual_accrued_benefits()*discount_factor()*survive_to65_2000()*annuity_factor_2000;
		};

		var puc_normal_cost_2010 = function(){
			return puc_annual_accrued_benefits()*discount_factor()*survive_to65_2010()*annuity_factor_2010;
		};

		var ean_normal_cost_2000 = function(){
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
			return (ean_normal_cost_2010()*temporary_annuity_2010[age]);
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
		}
	};

}());

function DecimalRound(num,places){
	return Math.round( num * Math.pow(10,places) ) / Math.pow(10,places);
}