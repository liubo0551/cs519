surface
lab2( float
		Ad = 0.1,
		Bd = 0.2, // dot diameter
		Ks = 0.5,
		Kd = 0.5, 
		Ka = .1, 
		roughness = 0.1,
		Height = 0.10,				// displacement height
		Ramp   = 0.50,				// fraction of square used for the ramp
		NoiseAmp  = 0.00,			// noise amplitude
		NoiseFreq = 0.10;			// noise frequency
        color	specularColor = color( 1, 1, 1 );
)
{
	

	

	varying vector Nf = faceforward( normalize( N ), I );
	vector V = normalize( -I );
	
	point PP = point "shader" P;
	float magnitudeU = 0.;
	float magnitudeV = 0.;
	point PP2 = PP + vector(10.,10.,10.);
	float size = 1.;
	float i;
	for( i = 0.; i < 6.0; i += 1.0 )
	{
		magnitudeU += ( noise( NoiseFreq * size * PP  ) - 0.50 ) / size;
		magnitudeV += ( noise( NoiseFreq * size * PP2 ) - 0.50 ) / size;
		size *= 2.0;
	}
	
	float up =  2 * xcomp(P);
	float vp =  ycomp(P);
	
	up += NoiseAmp*magnitudeU;
	//vp += NoiseAmp*magnitudeV;
	
	float numinu = floor( up / (2.0*Ad) );
	float numinv = floor( vp / (2.0*Bd) );
	
	float TheHeight = 0.;			// how much displacement to apply
	color dotColor = Cs;
	if( mod( numinu+numinv, 2 ) == 0 )
	{
		float uc = numinu*Ad + Ad/2.;
		float vc = numinv*Bd + Bd/2.;
		up = up - uc;
		vp = vp - vc;
		point upvp =  point( up/Ad, vp/Bd, 0. );
		point cntr =  point( uc/Ad, vc/Bd, 0. );
		//if( distance( upvp, cntr ) <= 1. )
		if((((up - uc)/Ad)*((up - uc)/Ad) + ((vp - vc)/Bd)*((vp - vc)/Bd))<1.0)
		{
			float dist = distance( upvp, cntr )*sqrt(Ad*Ad+Bd*Bd);
			//float t = smoothstep( 0., Ramp, dist );	   // 0. if dist <= 0., 1. if dist >= Ramp
			TheHeight = Height-dist*Height;			   // apply the blending
			//dotColor = color( 1., .5, 0. );      // beaver orange?
		}
	}
	if( TheHeight != 0. )
		dotColor = color( 1., .5, 0. );
	Oi = 1.;
	Ci = Oi * ( dotColor * ( Ka * ambient() + Kd * diffuse(Nf) ) +
				specularColor * Ks * specular( Nf, V, roughness )  );
}
