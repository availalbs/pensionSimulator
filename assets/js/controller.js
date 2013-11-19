
angular.module('pensionCalculator', ['uiSlider']);

function pensionController($scope){

	$scope.calculateTotals = function(){
		$scope.salaryTotal=0;
		$scope.puc_aal_2000=0;
		$scope.puc_aal_2010=0;
		$scope.puc_normal_2000=0;
		$scope.puc_normal_2010=0;
		$scope.ean_aal_2000=0;
		$scope.ean_aal_2010=0;
		$scope.ean_normal_2000=0;
		$scope.ean_normal_2010=0;

		$scope.employees.forEach(function(employee){

			$scope.salaryTotal+= employee.get_salary();
			$scope.puc_aal_2000+=employee.get_puc_accumulated_accrued_liabilities_2000();
			$scope.puc_aal_2010+=employee.get_puc_accumulated_accrued_liabilities_2010();
			$scope.puc_normal_2000+=employee.get_puc_normal_cost_2000();
			$scope.puc_normal_2010+=employee.get_puc_normal_cost_2010();
			$scope.ean_aal_2000+=employee.get_ean_accumulated_accrued_liabilities_2000();
			$scope.ean_aal_2010+=employee.get_ean_accumulated_accrued_liabilities_2010();
			$scope.ean_normal_2000+=employee.get_ean_normal_cost_2000();
			$scope.ean_normal_2010+=employee.get_ean_normal_cost_2010();
		});
		$scope.salaryTotal = DecimalRound($scope.salaryTotal,2);
		$scope.puc_aal_2000 = DecimalRound($scope.puc_aal_2000,2);
		$scope.puc_aal_2010 = DecimalRound($scope.puc_aal_2010,2);
		$scope.puc_normal_2000 = DecimalRound($scope.puc_normal_2000,2);
		$scope.puc_normal_2010 = DecimalRound($scope.puc_normal_2010,2);
		$scope.ean_aal_2000 = DecimalRound($scope.ean_aal_2000,2);
		$scope.ean_aal_2010 = DecimalRound($scope.ean_aal_2010,2);
		$scope.ean_normal_2000 = DecimalRound($scope.ean_normal_2000,2);
		$scope.ean_normal_2010 = DecimalRound($scope.ean_normal_2010,2);

		$scope.puc_aal_2000_percent = DecimalRound($scope.puc_aal_2000/$scope.salaryTotal*100,2);
		$scope.puc_aal_2010_percent = DecimalRound($scope.puc_aal_2010/$scope.salaryTotal*100,2);
		$scope.puc_normal_2000_percent = DecimalRound($scope.puc_normal_2000/$scope.salaryTotal*100,2);
		$scope.puc_normal_2010_percent = DecimalRound($scope.puc_normal_2010/$scope.salaryTotal*100,2);
		$scope.ean_aal_2000_percent = DecimalRound($scope.ean_aal_2000/$scope.salaryTotal*100,2);
		$scope.ean_aal_2010_percent = DecimalRound($scope.ean_aal_2010/$scope.salaryTotal*100,2);
		$scope.ean_normal_2000_percent = DecimalRound($scope.ean_normal_2000/$scope.salaryTotal*100,2);
		$scope.ean_normal_2010_percent = DecimalRound($scope.ean_normal_2010/$scope.salaryTotal*100,2);
	};

	$scope.institution = [{'age':30,'yos':0},{'age':30,'yos':0},{'age':30,'yos':0},{'age':31,'yos':1},{'age':31,'yos':1},{'age':31,'yos':1},{'age':32,'yos':2},{'age':32,'yos':2},{'age':32,'yos':2},{'age':33,'yos':3},{'age':33,'yos':3},{'age':33,'yos':3},{'age':34,'yos':4},{'age':34,'yos':4},{'age':34,'yos':4},{'age':35,'yos':5},{'age':35,'yos':5},{'age':35,'yos':5},{'age':36,'yos':6},{'age':36,'yos':6},{'age':36,'yos':6},{'age':37,'yos':7},{'age':37,'yos':7},{'age':37,'yos':7},{'age':38,'yos':8},{'age':38,'yos':8},{'age':38,'yos':8},{'age':39,'yos':9},{'age':39,'yos':9},{'age':39,'yos':9},{'age':40,'yos':10},{'age':40,'yos':10},{'age':40,'yos':10},{'age':41,'yos':11},{'age':41,'yos':11},{'age':41,'yos':11},{'age':42,'yos':12},{'age':42,'yos':12},{'age':42,'yos':12},{'age':43,'yos':13},{'age':43,'yos':13},{'age':43,'yos':13},{'age':44,'yos':14},{'age':44,'yos':14},{'age':44,'yos':14},{'age':45,'yos':15},{'age':45,'yos':15},{'age':45,'yos':15},{'age':46,'yos':16},{'age':46,'yos':16},{'age':46,'yos':16},{'age':47,'yos':17},{'age':47,'yos':17},{'age':47,'yos':17},{'age':48,'yos':18},{'age':48,'yos':18},{'age':48,'yos':18},{'age':49,'yos':19},{'age':49,'yos':19},{'age':49,'yos':19},{'age':50,'yos':20},{'age':50,'yos':20},{'age':50,'yos':20},{'age':51,'yos':21},{'age':51,'yos':21},{'age':51,'yos':21},{'age':52,'yos':22},{'age':52,'yos':22},{'age':52,'yos':22},{'age':53,'yos':23},{'age':53,'yos':23},{'age':53,'yos':23},{'age':54,'yos':24},{'age':54,'yos':24},{'age':54,'yos':24},{'age':55,'yos':25},{'age':55,'yos':25},{'age':55,'yos':25},{'age':56,'yos':26},{'age':56,'yos':26},{'age':56,'yos':26},{'age':57,'yos':27},{'age':57,'yos':27},{'age':57,'yos':27},{'age':58,'yos':28},{'age':58,'yos':28},{'age':58,'yos':28},{'age':59,'yos':29},{'age':59,'yos':29},{'age':59,'yos':29},{'age':60,'yos':30},{'age':60,'yos':30},{'age':60,'yos':30},{'age':61,'yos':31},{'age':61,'yos':31},{'age':61,'yos':31},{'age':62,'yos':32},{'age':62,'yos':32},{'age':62,'yos':32},{'age':63,'yos':33},{'age':63,'yos':33},{'age':63,'yos':33},{'age':64,'yos':34},{'age':64,'yos':34},{'age':64,'yos':34},{'age':65,'yos':35},{'age':65,'yos':35},{'age':65,'yos':35}];
	pensionCalculator.init($scope.institution);
	$scope.employees = pensionCalculator.employees();
	$scope.salaryTotal=0;
	$scope.puc_aal_2000=0;
	$scope.puc_aal_2010=0;
	$scope.puc_normal_2000=0;
	$scope.puc_normal_2010=0;
	$scope.ean_aal_2000=0;
	$scope.ean_aal_2010=0;
	$scope.ean_normal_2000=0;
	$scope.ean_normal_2010=0;
	$scope.calculateTotals();


	$scope.interest_rate = pensionCalculator.interest_rate();
	$scope.$watch('interest_rate',function(){
		pensionCalculator.interest_rate($scope.interest_rate);
		$scope.calculateTotals();
	});

	$scope.inflation_rate = pensionCalculator.inflation_rate();
	$scope.$watch('inflation_rate',function(){
		pensionCalculator.inflation_rate($scope.inflation_rate);
		$scope.calculateTotals();
	});

	$scope.salary_growth_rate = pensionCalculator.salary_growth_rate();
	$scope.$watch('salary_growth_rate',function(){
		pensionCalculator.salary_growth_rate($scope.salary_growth_rate);
		$scope.calculateTotals();
	});

	$scope.base_benefit_factor = pensionCalculator.base_benefit_factor();
	$scope.$watch('base_benefit_factor',function(){
		pensionCalculator.base_benefit_factor($scope.base_benefit_factor);
		$scope.calculateTotals();
	});

	
}

